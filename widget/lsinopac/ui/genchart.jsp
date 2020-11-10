<%--
    This page copied from project Monex
--%>
<%@ page language="java"%>
<%@ page import="com.labci.ta4j.basic.*"%>
<%@ page import="com.labci.ta4j.basic.model.Style"%>
<%@ page import="com.labci.rjah.common.cache.*"%>
<%--@ page import="com.labci.rjah.dao.*"--%>
<%@ page import="java.awt.*"%>
<%@ page import="java.util.*"%>
<%@include file="param.jspf"%>
<%@include file="util.jsp" %>
<%!
    static Map forexRicMap = new HashMap();
    //static Map bondNotShowInterdayChartMap = new HashMap();
    static Map eodMap = new HashMap();
    static Set rtMap = new HashSet();// realtime map
    static HashMap<String,Object> delayMap = new HashMap(); // delay map
    
    static
    {

        
    }   // end static...
    
%>


<%

String tokendelimiter = "|";
String jspName = "chart";
long delayTime = 0;
ChartGeneratorThreadPool pool = ChartGeneratorThreadPool.getInstance();
ChartGenerator cg = pool.getChartGenerator(ChartGeneratorThreadPool.GIF_TRANSPARENT);
CacheHelper cacheHelper = CacheHelper.getInstance();
//delayTime = 60*1000*20;
//cg.setDelayTime(delayTime);
try {
    int vol=0;
    int offset = 0;
    String [] temp=new String []{""};
    String sym = paramHelper.getParameter("sym");
    
    String compSym = paramHelper.getParameter("compsym");//request.getParameter("compsym");
        
    //20100915 add by Pong
    sym = getNewJasdaqCode(sym); 
    compSym = getNewJasdaqCode(compSym); 
       
    String toparg = request.getParameter("toparg");
    int fontsize = (request.getParameter("fsize") != null?Integer.parseInt(request.getParameter("fsize")):11);    
    int per = Integer.parseInt(paramHelper.getParameter("per"));
    int reqint = Integer.parseInt(paramHelper.getParameter("int"));
    if (reqint == 0)
    {
        offset = 1*60*1000;
    }
    else if (reqint == 1)
    {
        offset = 5*60*1000;
    }
    else if (reqint == 2)
    {
        offset = 15*60*1000;
    }
    else if (reqint == 3)
    {
        offset = 60*60*1000;
    }
    
    boolean error = false;
    int type = Integer.parseInt(paramHelper.getParameter("style"));
    if ( paramHelper.getParameter("vol") != null ) { vol = Integer.parseInt(paramHelper.getParameter("vol")); } else { vol = 0; }
    String chart = paramHelper.getParameter("sizeid");
    
    int width = 0;
    int height = 0;
    if (chart.equals("C20")){
        width = 440;
        height = 215;        
    }
    else
        error = true;
        
    // vlam: 20090106: proper delay handling...
    boolean isRT = false;
    // vlam: 20090130: guard against un-exposable RICs...
    boolean isAccepted = false;     // default is false...
    
    //20101129 add by Pong
    //change FX and OSEFX 5hours to 24hours for intraday chart
    boolean isForex = false;
    if(sym.endsWith("=ECI")){
        isAccepted = true;
    }

    delayTime = 0;
    cg.setDelayTime(delayTime);
    
    
    cg.setSkipBreak(false);
    
        //System.out.println(delayTime);    
    long start = 0, end = 0;
    
    boolean drawVGrid = true;
    byte [] b =null;
    
    Style chartStyle = null;
    int p = 1;
    int span = 1;
    
    //System.out.println("sym:" + sym + "error: " + error + " isAccepted: " + isAccepted + " isRT:" + isRT);
    
    if (!error && isAccepted)
    {
        try {
            StringBuffer stringBuffer = new StringBuffer();
            stringBuffer.append(jspName);
            stringBuffer.append(tokendelimiter);
            //stringBuffer.append(chart);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(sym);
            if(compSym != null) stringBuffer.append(compSym);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(per);
            //stringBuffer.append(tokendelimiter);
            //stringBuffer.append(style);
            if(toparg != null)stringBuffer.append(toparg);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(reqint);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(vol);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(width);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(height);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(type);
            stringBuffer.append(tokendelimiter);
            stringBuffer.append(delayTime);

            String key = stringBuffer.toString();

            b = (byte [])cacheHelper.get(key);
            if (b == null)
            {
                chartStyle = new Style();
                chartStyle.setBgColor(new Color(247, 247, 247));

                chartStyle.setTextColor(new Color(51,51,51));

                chartStyle.setTextFont(new Font("sanserif", Font.PLAIN, fontsize));

                chartStyle.setGridColor(new Color(204,204,204));

                chartStyle.setFgColor(Color.BLACK);
                chartStyle.setXTextFont(new Font("sanserif", Font.PLAIN, fontsize));

                chartStyle.setTextColor(new Color(51,51,51));


                chartStyle.setLargerCandleStick(true);

                chartStyle.setPDCloseColor(new Color(255,133,133));

                chartStyle.setLineColor(new Color(0x0A,0x3F,0xA0));               // #1c43a7: blue
                chartStyle.setFillColor(new Color(0x0A,0x3F,0xA0));               // #1c43a7: blue
                chartStyle.setCandleStickLineColorSameAsCandleStickColor(true);
                chartStyle.setBarBorderDownColor(new Color(0x00,0x33,0x99));      // #000000: black
                chartStyle.setBarDownColor(new Color(0x00,0x33,0x99));
                chartStyle.setBarBorderUpColor(new Color(0xFF,0x00,0x33));        // #000000: black
                chartStyle.setBarUpColor(new Color(0xFF,0xFF,0xFF));              // #ffffff: white
                chartStyle.setPrintDateForMinuteChart(true);

                // We truncate price for JP stocks and no volume TA chart
                if (vol != 1 && (sym.endsWith(".T") || sym.endsWith(".OS") || sym.endsWith(".Q") || sym.endsWith(".OJ") || sym.endsWith(".FU") || sym.endsWith(".SP") || sym.endsWith(".NG")))
                {
                    chartStyle.setJPPriceUnit(true);
                    chartStyle.setJPPriceUnitLabel(new String[]{"", "", "\u767E\u5186", "\u5343\u5186"});
                }

                if ( width==150 || width == 600){chartStyle.setBoldLine(false);}
                else {chartStyle.setBoldLine(true);}
                cg.setPrintYear(false);
                //drawVGrid = false;

                switch(reqint) 
                {
                    case 0:
                        span = ChartGenerator.SPAN_1MIN;                            
                        break;
                    case 1:
                        span = ChartGenerator.SPAN_5MIN;
                        break;
                    case 2:
                        span = ChartGenerator.SPAN_15MIN;
                        break;
                    case 3:
                        span = ChartGenerator.SPAN_HOURLY;
                        break;
                    case 4:
                        span = ChartGenerator.SPAN_DAILY;
                        break;
                    case 5:
                        span = ChartGenerator.SPAN_WEEKLY;
                        break;
                    case 6:
                        span = ChartGenerator.SPAN_MONTHLY;
                        break;
                    case 7:
                        span = ChartGenerator.SPAN_QUARTERMONTHLY;
                        break;
                    default:
                        error = true;
                }   // end switch...

                switch(per) 
                {
                    case 0:
                        //20101129 add by Pong
                        //change FX and OSEFX 5hours to 24hours for intraday chart                    
                        //p = (sym.indexOf("=") > -1?ChartGenerator.PERIOD_5HOUR:ChartGenerator.PERIOD_1DAY);
                        if(sym.indexOf("=") > -1){                        
                            if(sym.startsWith("OSE") || isForex || sym.equals("XAUFIX=")){
                                p = ChartGenerator.PERIOD_1DAY;
                            }
                            else{
                                p = ChartGenerator.PERIOD_5HOUR;
                            }
                        }
                        else{
                            p = ChartGenerator.PERIOD_1DAY;
                        }

                        break;
                    case 1:
                        p = ChartGenerator.PERIOD_2DAY;
                        break;
                    case 2:
                        p = ChartGenerator.PERIOD_5DAY;
                        break;
                    case 3:
                        p = ChartGenerator.PERIOD_10DAY;
                        break;
                    case 4:
                        p = ChartGenerator.PERIOD_MTD;
                        break;
                    case 5:
                        p = ChartGenerator.PERIOD_1MONTH;
                        break;
                    case 6:
                        p = ChartGenerator.PERIOD_2MONTH;
                        break;
                    case 7:
                        p = ChartGenerator.PERIOD_3MONTH;
                        break;
                    case 8:
                        p = ChartGenerator.PERIOD_6MONTH;
                        break;
                    case 9:
                        p = ChartGenerator.PERIOD_QTD;
                        break;
                    case 10:
                        p = ChartGenerator.PERIOD_YTD;
                        break;
                    case 11:
                        p = ChartGenerator.PERIOD_1YEAR;
                        break;
                    case 12:
                        p = ChartGenerator.PERIOD_2YEAR;
                        break;
                    case 13:
                        p = ChartGenerator.PERIOD_3YEAR;
                        break;
                    case 14:
                        p = ChartGenerator.PERIOD_4YEAR;
                        break;
                    case 15:
                        p = ChartGenerator.PERIOD_5YEAR;
                        break;
                    case 16:
                        p = ChartGenerator.PERIOD_10YEAR;
                        break;
                    case 17:
                        p = ChartGenerator.PERIOD_5HOUR;
                        break;
                    case 18:
                        p = ChartGenerator.PERIOD_7WEEK;
                        break;
                    default:
                        error = true;
                }

                if (chartStyle != null)
                    cg.setStyle(chartStyle);

                if(compSym == null) {
                    int s = 1;

                    if (type==1)
                        s = ChartGenerator.FILL2;
                    else if (type==3)
                        s = ChartGenerator.BAR;
                    else if (type == 2)
                        s = ChartGenerator.CANDLE_WITH_BORDER;
                    else if (type == 4)
                        s = ChartGenerator.DOT;
                    else if (type == 9)
                        s = ChartGenerator.HISTORIGRAM_BASE_ON_ZERO;
                    else
                        error = true;

                    if (!drawVGrid)
                        cg.setTSDrawVGrid(false);

                    if (start==0 && end==0)
                        cg.setPriceChart(sym, span, p, width, height, s, true);
                    else
                        cg.setPriceChart(sym, span, p, width, height, s, true, start, end);

                    if (per == 0 && (reqint==0 || reqint==1))
                    cg.setDrawPDClose(true);

                    Object [] args;
                    if (vol == 1)
                    {
                        args = new Object[1];
                        // volumn color
                        args[0] = new Color(0xA5,0x9A,0xCA);

                        cg.addTA(ChartGenerator.TASERIES_VOL, args);
                    }
                    else if (vol == 2)
                    {

                        args = new Object[2];
                        // volumn color
                        args[0] = new Color(0x99,0x99,0x99);
                        if (chart != null && chart.equals("C3"))
                        {
                            cg.setVAPVWidth(25);
                        }
                        //else
                            args[1] = new Boolean(false);

                        cg.addTA(ChartGenerator.TASERIES_VAPV, args);                    
                    }

                    if (toparg != null) 
                    {               
                        args = new Object[4];
                        temp = toparg.split(",");
                        args[0] = new Integer(temp[0]);
                        args[1] = new Integer(temp[1]);
                        args[2] = new Color(0xcc,0x00,0x33);
                        args[3] = new Color(0xcc,0x00,0xff);
                        cg.addTA(ChartGenerator.TASERIES_2SMA, args);

                    }
                    else
                    {

                    }   // end if...

                // generate comparison chart
                } else {
                    // Dec 24, 2008 - for some reason the period shifted for comparsion chart, now add 1 to overcome this for now!!
                    //p++;
                    cg.setComparisionChart(new String[]{sym,compSym}, span, p, width, height, new Object[]{new Color(255,0x66,0)}, true);
                }
                b = cg.draw();
                if (b!=null)
                    cacheHelper.put(key, b);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            error = true;
        }
    }

    if (b != null && !error)
    {
        response.setContentType("image/gif");
        ServletOutputStream sout = response.getOutputStream();
        sout.write(b); 
        sout.flush();
        sout.close();
    }
    else
    {      
        String str = request.getContextPath() + "/images/errorchart/error_" + chart + ".gif";
        response.sendRedirect(str);
    } 
    } catch (Exception e) {
        e.printStackTrace();
        response.sendRedirect(request.getContextPath() + "/images/errorchart/d_error.gif"); 
    }

finally{
    if(pool != null && cg != null)
        pool.returnChartGenerator(cg, ChartGeneratorThreadPool.GIF_TRANSPARENT);
}
out.clear();
out = pageContext.pushBody();    
// NOTE : Be sure no output line beyond this point!! Not even write space or newline. Otherwise, this will create java.lang.IllegalStateException.
//20100201-6 : support osefx
%>
