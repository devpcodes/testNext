<%@page import="java.math.*"%>
<%@page import="java.util.*"%>
<%@page import="java.text.*"%>
<%@page import="java.net.*"%>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Locale"%>
<%@page import="java.util.Date"%>
<%@page import="org.w3c.dom.*"%>
<%!
  
//used by genchart.jsp

static public BigDecimal BIG_DECIMAL_ZERO = new BigDecimal("0");

public String hideZero(String str)
{
    String temp = "--";
    
    try
    {
        //System.out.println("hideZero " + str);
        if (str != null)
        {
            BigDecimal bd = new BigDecimal(str);
            //System.out.println("hideZero(bd) " + bd + " " + bd.compareTo(BIG_DECIMAL_ZERO));
            if (bd.compareTo(BIG_DECIMAL_ZERO) == 0)
                return temp;
        }
        else
            return "--";
        
    } catch (Exception e) {
        
        e.printStackTrace();
    }
    //System.out.println("hideZero " + str);
    if (str != null /*&& !str.equals("0.0") && !str.equals("-0.00") && !str.equals("-0.000") && !str.equals("-0.0000") && !str.equals("-0.0") && 
        !str.equals("0")*/ && !str.equals("")/* && !str.equals("0.00000")*/ && !str.equals("0.0") && !str.equals("--"))
    {
        temp = addComma(str);
    }
    return temp;
}

public String hideZeroNet(String str)
{
    //System.out.println(str);
    String temp = "--";
    if (str != null && !str.equals("0.0") && !str.equals("0.00") && !str.equals("0.000") && !str.equals("0.0000"))
    {
        //temp = roundUp(str, 2);
        temp = str;
        if (temp.indexOf("-") < 0 && !temp.equals("") )
        {
            temp = "+" + temp;
        }
    }
    return temp;
}
public String hideZeroFXNet(String str)
{
    String temp = "&nbsp;";
    if (str != null && /*!str.equals("0.0") && !str.equals("-0.00") && !str.equals("-0.000") && !str.equals("-0.0000") && !str.equals("-0.0") && 
        !str.equals("0") &&*/ !str.equals("") /*&& !str.equals("0.00000")*/ && !str.equals("&nbsp;"))
    {
        temp = roundUp(str, 4);
        if (temp.indexOf("-") < 0 && !temp.equals("&nbsp;"))
        {
            temp = "+" + temp;
        }
    }
    return temp;
}
public String hideZeroPer(String str)
{
    String temp = "--";
    if (str != null && !str.equals("-0.00") && !str.equals("-0.000") && !str.equals("-0.0000") && !str.equals("-0.0") && 
        !str.equals("0") && !str.equals("") && !str.equals("0.00000") && !str.equals("--") && !str.equals("-100.0"))
    {
        temp = str + "%";
        if (temp.indexOf("-") < 0 && !temp.equals("&nbsp;"))
        {
            temp = "+" + temp;
        }
    }
    else if (str !=null  && (str.equals("--") || str.equals("-100.0") || str.equals("0.0")))
    {
       temp = "--";
    }
    return temp;
}

/* no per sign*/
public String hideZeroPer1(String str)
{
    String temp = "&nbsp;";
    if (str != null && !str.equals("0.0") && !str.equals("-0.00") && !str.equals("-0.000") && !str.equals("-0.0000") && !str.equals("-0.0") && 
        !str.equals("0") && !str.equals("") && !str.equals("0.00000"))
    {
        temp = roundUp(str, 2);
        if (temp.indexOf("-") < 0 && !temp.equals("&nbsp;"))
        {
            temp = "+" + temp;
        }
    }
    return temp;
}

public String getUpDnColor(String input)
{
    String color = "black";
    if (input != null)
    {
        if (input.indexOf("-") > -1)
        {
            color = "green";
        }
        else if (input.indexOf("-") < 0 && !input.equals("+0.00") && !input.equals("+0.000") && !input.equals("+0.0000") && !input.equals("+0.0")
                    && !input.equals("+0"))
        {
            color = "red";
        }
    }
    return color;
}
public String toHKTimeZone(String time)
{
    String temp = "&nbsp;";
    try {
    if (time != null && time.length() >=5)
    {
        int hour = Integer.parseInt(time.substring(0, 2));
        int minute = Integer.parseInt(time.substring(3, 5));
        GregorianCalendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT"));
        cal.set(Calendar.HOUR_OF_DAY, hour);
        cal.set(Calendar.MINUTE, minute);
        hour = cal.get(Calendar.HOUR_OF_DAY);
        minute = cal.get(Calendar.MINUTE);
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Hong_Kong"));
        if (cal.get(Calendar.HOUR_OF_DAY) < 10)
        {
            temp = "0" + cal.get(Calendar.HOUR_OF_DAY);
        }
        else 
        {
            temp = Integer.toString(cal.get(Calendar.HOUR_OF_DAY));
        }
        if (cal.get(Calendar.MINUTE) < 10)
        {
            temp += ":0" + cal.get(Calendar.MINUTE);
        }
        else 
        {
            temp += ":" + cal.get(Calendar.MINUTE);
        }
    }
    } catch (Exception ex){
        temp = "&nbsp;";
    }
    return temp;
}
public String JPtoHKTimeZone(String time, String date)
{
    String temp = "&nbsp;";
    try {
    if (time != null && time.length() >= 5 && date != null && date.length() == 10)
    {
        int hour = Integer.parseInt(time.substring(0, 2));
        int minute = Integer.parseInt(time.substring(3, 5));
        int year = Integer.parseInt(date.substring(0, 4));
        int month = Integer.parseInt(date.substring(5, 7));
        int day = Integer.parseInt(date.substring(8, 10));
        GregorianCalendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT"));
        cal.set(Calendar.HOUR_OF_DAY, hour);
        cal.set(Calendar.MINUTE, minute);
        cal.set(Calendar.YEAR, minute);
        cal.set(Calendar.MONTH, minute);
        cal.set(Calendar.DAY_OF_MONTH, minute);
        hour = cal.get(Calendar.HOUR_OF_DAY);
        minute = cal.get(Calendar.MINUTE);
        year = cal.get(Calendar.YEAR);
        month = cal.get(Calendar.MONTH);
        day = cal.get(Calendar.DAY_OF_MONTH);
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
        if (cal.get(Calendar.HOUR_OF_DAY) < 10)
        {
            temp = "0" + cal.get(Calendar.HOUR_OF_DAY);
        }
        else 
        {
            temp = Integer.toString(cal.get(Calendar.HOUR_OF_DAY));
        }
        if (cal.get(Calendar.MINUTE) < 10)
        {
            temp += ":0" + cal.get(Calendar.MINUTE);
        }
        else 
        {
            temp += ":" + cal.get(Calendar.MINUTE);
        }
    }
    } catch (Exception ex){
        temp = "&nbsp;";
    }    
    return temp;
}

/*
public String[] getWidth(String[] barValue)
{
    String[] width = new String[barValue.length];
    //int length = getMax(barValue);
    for(int i = 0; i < barValue.length; i++)
    {
        
    }
    return width;
}
*/
public double getMax(String[] barValue)
{
    double max = 0;
    try {
    String[] tempArr = barValue;
    for (int i = 0; i < tempArr.length; i++)
    {
        if (tempArr[i] != null && !tempArr[i].equals("") && !tempArr[i].equals("--"))
        {
            if (tempArr[i].indexOf("-") > -1)
            {
                if (max < Double.parseDouble(tempArr[i].substring(1)))
                {
                    max = Double.parseDouble(tempArr[i].substring(1));
                }
            }
            else
            {
                if (max < Double.parseDouble(tempArr[i]))
                {
                    max = Double.parseDouble(tempArr[i]);
                }
            }
        }
    }
    } catch (Exception ex){
        max = 0;
    }    
    return max;
}

public double getDMax(double[] barValue)
{
    double max = 0;
    try {
    double[] tempArr = barValue;
    for (int i = 0; i < barValue.length; i++)
    {
        //if (tempArr[i] != null)
        //{
            if ((Double.toString(tempArr[i])).indexOf("-") > -1)
            {
                if (max < Double.parseDouble((Double.toString(tempArr[i])).substring(1)))
                {
                    max = Double.parseDouble((Double.toString(tempArr[i])).substring(1));
                }
            }
            else
            {
                if (max < tempArr[i])
                {
                    max = tempArr[i];
                }
            }
        //}
    }
    } catch (Exception ex){
        max = 0;
    }      
    return max;
}

public int[] sort(String[] arr)
{
    try {
    int temp = 0;
    int[] index = new int[arr.length];
    int count = 0;
    double[] dArr = new double[arr.length];
    for ( int i = 0; i < arr.length; i++)
    {
        if (!arr[i].equals("--"))
            dArr[i] = Double.parseDouble(arr[i]);
        else
        {
            dArr[i] = -100.00;
        }
    }
    for ( int i = 0; i < arr.length; i++)
    {
        index[i] = i;
        if (dArr[i] < 0.0)
        {
            count ++;
        }
        
    }
    for ( int i = 0; i < dArr.length; i++) {
        for ( int j = 0; j < dArr.length; j++) 
        {
            double a = dArr[i];
            double b = dArr[j];
                if ( a > b) 
                {//descending
                    double mv = dArr[i];
                    dArr[i] = dArr[j];
                    dArr[j] = mv;

                    int mv1 = index[i];
                    index[i] = index[j];
                    index[j] = mv1;
                }
        }
    }
    /*for ( int i = 0; i < dArr.length; i++)
    {
        if (dArr[i] == 0.0)
        {
            temp = i;
            break;
        }
    }
    for ( int i = temp; i < dArr.length; i++) {
        for ( int j = temp; j < dArr.length; j++) 
        {
            double a = dArr[i];
            double b = dArr[j];
                if ( a < b ) 
                {//ascending
                    double mv = dArr[i];
                    dArr[i] = dArr[j];
                    dArr[j] = mv;

                    int mv1 = index[i];
                    index[i] = index[j];
                    index[j] = mv1;
                }
        }
    }
    for ( int i = 0; i < dArr.length; i++)
    {
        if (dArr[i] < 0.0)
        {
            temp = i;
            break;
        }
    }
    for ( int i = temp; i < temp + count; i++) {
        for ( int j = temp; j < temp + count; j++) 
        {
            double a = dArr[i];
            double b = dArr[j];
                if ( a >= b ) 
                {//descending
                    double mv = dArr[i];
                    dArr[i] = dArr[j];
                    dArr[j] = mv;

                    int mv1 = index[i];
                    index[i] = index[j];
                    index[j] = mv1;
                }
        }
    }*/
    for ( int i = 0; i < arr.length; i++)
    {
        arr[i] = Double.toString(dArr[i]);
    }
    return index;
    } catch (Exception ex){
        return new int[arr.length];
    }
}

/*public Vector sort1(Vector v)
{
    Collections.sort(v, new Comparator() {
                              public int compare(Object o1, Object o2) {
                                // Compare the submit date/time entries
                                return (int)
                                       ( ((Indice) o2).getPerchg()
                                       - ((Indice) o1).getPerchg());
                              }
                              public boolean equals(Object obj) {
                                return false;
                              }
                            });
        return v;
}*/

public String getPrc(String prc, String close_prc)
{
    String temp = "";
    if (prc != null && close_prc != null)
    {
        if (prc.equals("") || prc.equals("0.0"))
        {
            temp = close_prc;
        }
        else
        {
            temp = prc;
        }
    }
    else
    {
        temp = prc;
    }
    return temp;
}

private String addComma(String temp)
{
        if (temp != null && !temp.equals("&nbsp;") && temp.length()!=0)
        {
            String oldValue = temp;
            boolean isNegative = false;
            boolean isPositive = false;
            if (temp.indexOf("+") > -1)
            {
                temp = temp.substring(1);
                isPositive = true;
            }
            else if (temp.indexOf("-") > -1 && temp.indexOf("--") < 0)
            {
                temp = temp.substring(1);
                isNegative = true;
            }
            int decimalInd = temp.indexOf(".");
            int startInd = temp.length();
            if (decimalInd != -1)
                startInd = decimalInd;
            
            for (int i=1; i<(startInd-1)/3 + 1; i++)
            {
                int addInd = startInd - 3*i;
                temp = temp.substring(0, addInd) + "," + temp.substring(addInd);
            }
            
            if (isNegative)
                return "-" + temp;
            if (isPositive)
                return "+" + temp;
            return temp;
        }
        else if (temp != null && temp.equals("&nbsp;"))
            return temp;
        else
            return "--";
}

public String getTick(String tick) throws Exception
{
    
    if (tick != null && !tick.equals(""))
    {
        /*
        tick = URLEncoder.encode(tick, "iso8859-1");
        if (tick.equals("%DE") || tick.equals("IB") || tick.equals("B%DE"))
        {
            tick = "<img src='imgs/arrow1.gif' alt='?'>";
        }
        else if (tick.equals("%FE") || tick.equals("B%FE") || tick.equals("B"))
        {
            tick = "<img src='imgs/arrow2.gif' alt='?'>";
        }
        else 
        {
            tick = "<img src='imgs/spacer.gif' width='10' height='10'>";
        }
 * */
        int code = tick.hashCode();
        if (code==8679 || code==10725 || code==2329)
        {
            tick = "<img src='imgs/arrow1.gif' alt='U'>";
        }
        else if (code==8681 || code==10727 || code==66)
        {
            tick = "<img src='imgs/arrow2.gif' alt='D'>";
        }
        else 
        {
            tick = "<img src='imgs/spacer.gif' width='10' height='10'>";
        }
    }
    else 
    {
        tick = "<img src='imgs/spacer.gif' width='10' height='10'>";
    }
    return tick;

}

public String getTick2(String tick) throws Exception
{
    if (tick != null && !tick.equals(""))
    {
        /*
        tick = URLEncoder.encode(tick, "iso8859-1");
        if (tick.equals("%DE") || tick.equals("IB") || tick.equals("B%DE"))
        {
            tick = "<img src='../imgs/arrow1.gif' alt='?'>";
        }
        else if (tick.equals("%FE") || tick.equals("B%FE") || tick.equals("B"))
        {
            tick = "<img src='../imgs/arrow2.gif' alt='?'>";
        }
        else 
        {
            tick = "<img src='../imgs/spacer.gif' width='10' height='10'>";
        }
        */
        int code = tick.hashCode();
        if (code==8679 || code==10725 || code==2329)
        {
            tick = "<img src='imgs/arrow1.gif' alt='U'>";
        }
        else if (code==8681 || code==10727 || code==66)
        {
            tick = "<img src='imgs/arrow2.gif' alt='D'>";
        }
        else 
        {
            tick = "<img src='imgs/spacer.gif' width='10' height='10'>";
        }
    }
    else 
    {
        tick = "<img src='imgs/spacer.gif' width='10' height='10'>";
    }
    return tick;
}



public String toHKDate(String date, String time)
{
    String temp = "&nbsp;";
    try {
    if (date != null && date.length() >=7 && time != null && time.length() >= 5)
    {
        int hour = Integer.parseInt(time.substring(0, 2));
        int minute = Integer.parseInt(time.substring(3, 5));
        int day = Integer.parseInt(date.substring(0, 2));
        int year = Integer.parseInt("20" + date.substring(5, 7));
        String str_month = date.substring(2, 5);
        int month = 0;
        if ( str_month.equals( "JAN" )) { month = 0; }
        else if ( str_month.equals( "FEB" )) { month = 1; }
        else if ( str_month.equals( "MAR" )) { month = 2; }
        else if ( str_month.equals( "APR" )) { month = 3; }
        else if ( str_month.equals( "MAY" )) { month = 4; }
        else if ( str_month.equals( "JUN" )) { month = 5; }
        else if ( str_month.equals( "JUL" )) { month = 6; }
        else if ( str_month.equals( "AUG" )) { month = 7; }
        else if ( str_month.equals( "SEP" )) { month = 8; }
        else if ( str_month.equals( "OCT" )) { month = 9; }
        else if ( str_month.equals( "NOV" )) { month = 10; }
        else if ( str_month.equals( "DEC" )) { month = 11; }
        //System.out.println(str_month);
        GregorianCalendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT"));
        cal.set(year, month, day, hour, minute, 0);
        //cal.set(Calendar.DAY_OF_MONTH, day);
        //cal.set(Calendar.YEAR, year - 1900);
        day = cal.get(Calendar.DAY_OF_MONTH);
        month = cal.get(Calendar.MONTH);
        year = cal.get(Calendar.YEAR);
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Hong_Kong"));
        //System.out.println(cal.get(Calendar.DAY_OF_MONTH));
        if (cal.get(Calendar.DAY_OF_MONTH) < 10)
        {
            temp = "0" + cal.get(Calendar.DAY_OF_MONTH);
        }
        else 
        {
            temp = Integer.toString(cal.get(Calendar.DAY_OF_MONTH));
        }
        if (cal.get(Calendar.MONTH) == 0){ str_month = "JAN";}
        else if (cal.get(Calendar.MONTH) == 1){ str_month = "FEB";}
        else if (cal.get(Calendar.MONTH) == 2){ str_month = "MAR";}
        else if (cal.get(Calendar.MONTH) == 3){ str_month = "APR";}
        else if (cal.get(Calendar.MONTH) == 4){ str_month = "MAY";}
        else if (cal.get(Calendar.MONTH) == 5){ str_month = "JUN";}
        else if (cal.get(Calendar.MONTH) == 6){ str_month = "JUL";}
        else if (cal.get(Calendar.MONTH) == 7){ str_month = "AUG";}
        else if (cal.get(Calendar.MONTH) == 8){ str_month = "SEP";}
        else if (cal.get(Calendar.MONTH) == 9){ str_month = "OCT";}
        else if (cal.get(Calendar.MONTH) == 10){ str_month = "NOV";}
        else if (cal.get(Calendar.MONTH) == 11){ str_month = "DEC";}
        
        temp += str_month + (Integer.toString(cal.get(Calendar.YEAR))).substring(2, 4);
    }
    } catch (Exception ex){
        temp = "&nbsp;";        
    }
    return temp;
}

/* return value = a / b */
private String getCalValue1(String stra, String strb)
{
    BigDecimal a = new BigDecimal(0);
    BigDecimal b = new BigDecimal(0);
    try
    {
        if (stra != null && !stra.equals(""))
        {
            a = new BigDecimal(stra);
        }
        if (strb != null && !strb.equals(""))
        {
            b = new BigDecimal(strb);
        }
        if (a != null && b != null && !stra.equals("0.0000"))
        {
            return roundUp(a.divide(b, 2, BigDecimal.ROUND_UP).toString(), 2);
        }
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return "--";
    }
    return "--";
}

private String hideNull(String str)
{
    if (str != null && !str.equals(""))
    {
        return addComma(roundUp(str, 2));
    }
    return "--";
}

private String hideTextNull(String str)
{
    //System.out.println(str);
    if (str == null || str != null && (str.equals("")|| str.equals("null")))
    {
        return "--";
    }
    return str;
}

private String formatEmployee(String input)
{
    if (input != null && !input.equals(""))
    {
        return addComma(input);
    }
    return "--";
}

private String roundUp(String value, int index)
{
    String result = "";
        try
        {
            if (value != null && !value.equals("") && !value.equals("--"))
            {
                BigDecimal b = new BigDecimal(value).setScale(index, BigDecimal.ROUND_HALF_UP);
                result = b.toString();
            }
            else 
            {
                result = "";
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            result = "";
        }
        return result;
}

private String roundUp4(String value)
{
    String result = "";
        try
        {
            if (value != null)
            {
                BigDecimal b = new BigDecimal(value).setScale(4, BigDecimal.ROUND_HALF_UP);
                result = b.toString();
            }
            else 
            {
                result = "";
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            result = "";
        }
        return result;
}

/* return date formatted to ddMMMyy */
private String formatDate(String input)
{
    String result = "--";
    try
    {
        if (input != null && input.length() >= 7)
        {
            String temp = input.substring(0, 7);
            SimpleDateFormat sdf_result = new SimpleDateFormat("yy/MM/dd", Locale.US);
            SimpleDateFormat sdf_input = new SimpleDateFormat("ddMMMyy", Locale.US);
            java.util.Date date_input = sdf_input.parse(temp);
            result = sdf_result.format(date_input);
        }
    }
    catch (Exception e)
    {
        return "--";
    }
    return result;
}

/* return date formatted to ddMMMyy */
private String formatEstYear(String input)
{
    String result = "--";
    try
    {
        if (input != null && input.length() >= 10)
        {
            String temp = input.substring(0, 10);
            Calendar calendar = new GregorianCalendar();
            SimpleDateFormat sdf_result = new SimpleDateFormat("yyyy", Locale.TRADITIONAL_CHINESE);
            SimpleDateFormat sdf_input = new SimpleDateFormat("yyyy/MM/dd", Locale.US);
            java.util.Date date_input = sdf_input.parse(temp);
            calendar.setTime(date_input); 
            date_input.setDate(calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            result = sdf_result.format(date_input);
        }
    }
    catch (Exception e)
    {
        //e.printStackTrace();
        return "--";
    }
    return result;
}


private String formatEstMonthday(String input)
{
    String result = "--";
    try
    {
        if (input != null && input.length() >= 10)
        {
            String temp = input.substring(0, 10);
            Calendar calendar = new GregorianCalendar();
            SimpleDateFormat sdf_month = new SimpleDateFormat("MMM", Locale.TRADITIONAL_CHINESE);
            SimpleDateFormat sdf_day = new SimpleDateFormat("dd", Locale.TRADITIONAL_CHINESE);
            SimpleDateFormat sdf_input = new SimpleDateFormat("yyyy/MM/dd", Locale.US);
            java.util.Date date_input = sdf_input.parse(temp);
            calendar.setTime(date_input); 
            date_input.setDate(calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            result = sdf_month.format(date_input) + " " + sdf_day.format(date_input);
        }
    }
    catch (Exception e)
    {
        //e.printStackTrace();
        return "--";
    }
    return result;
}

/* return next year and formatted to ddMMMyy */
/*private String getDateOfNextYear(String input)
{
    String result = "--";
    try
    {
        if (input != null && input.length() >= 10)
        {
            int next_year = Integer.parseInt(input.substring(0, 4)) + 1;
            result = next_year + input.substring(4);
            result = formatDate(result);
        }
    }
    catch(Exception e)
    {
        return "--";
    }
    return result;
}*/

/* return previous year and formatted to ddMMMyy */
private String getDateOfPrevYear(String input)
{
    String result = "--";
    try
    {
        if (input != null && input.length() >= 10)
        {
            int prev_year = Integer.parseInt(input.substring(0, 4)) - 1;
            result = Integer.toString(prev_year) + input.substring(4);
            result = formatDate(result);
        }
    }
    catch (Exception e)
    {
        //e.printStackTrace();
        return "--";
    }
    return result;
}

/* return value = a / 100 */
private String getCalValue2(String stra)
{
    BigDecimal a = new BigDecimal(0);
    try
    {
        if (stra != null && !stra.equals(""))
        {
            a = new BigDecimal(stra);
        }
        if (a != null && !stra.equals("0.0000"))
        {
            return roundUp((a.divide(new BigDecimal(100), 4, BigDecimal.ROUND_UP)).toString(), 2);
        }
    }
    catch (Exception e)
    {
        //logger.error("GenCSVFile()", e);
        return "--";
    }
    return "--";
}

/* add unit m at the end */
private String addUnitM(String input)
{
    String result = "--";
    if (input != null && !input.equals("") && !input.equals("--"))
    {
        result = input + "m";
    }
    return result;
}

/* return value = a / b * 100*/
/*private String getCalValue3(String stra, String strb)
{
    BigDecimal a = new BigDecimal(0);
    BigDecimal b = new BigDecimal(0);
    try
        {
        if (stra != null && !stra.equals(""))
        {
            a = new BigDecimal(stra);
        }
        if (strb != null && !strb.equals(""))
        {
            b = new BigDecimal(strb);
        }
        if (a != null && !stra.equals("0.0000") && b != null && !strb.equals("0.0000"))
        {
            return roundUp(((a.divide(b, 2, BigDecimal.ROUND_UP)).multiply(new BigDecimal(100))).toString());
        }
    }
    catch (Exception e)
    {
        return "--";
    }
    return "--";
}*/
public String getUSPrc(String prc)
{
    String result = "&nbsp;";
    String head = "";
    String tail = "";
    try
    {
        if (prc != null && !prc.equals(""))
        {
            if (prc.indexOf("\\") > -1 || prc.indexOf("*") > -1 || prc.indexOf("#") > -1 || prc.indexOf("=") > -1 || prc.indexOf("!") > -1 || prc.indexOf("/") > -1 )
           {
               if (prc.indexOf("\\") > -1)
               {
                   head = prc.substring(0, prc.indexOf("\\"));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("\\") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(16), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
               else if (prc.indexOf("*") > -1)
               {
                   head = prc.substring(0, prc.indexOf("*"));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("*") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(32), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
               else if (prc.indexOf("#") > -1)
               {
                   head = prc.substring(0, prc.indexOf("#"));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("#") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(64), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
               else if (prc.indexOf("=") > -1)
               {
                   head = prc.substring(0, prc.indexOf("="));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("=") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(128), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
               else if (prc.indexOf("!") > -1)
               {
                   head = prc.substring(0, prc.indexOf("!"));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("!") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(256), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
               else if (prc.indexOf("/") > -1)
               {
                   head = prc.substring(0, prc.indexOf("/"));
                   int temp = Integer.parseInt(prc.substring(prc.indexOf("/") + 1));
                   tail = temp + "";
                   result = roundUp(((new BigDecimal(tail).divide(new BigDecimal(16), 4, BigDecimal.ROUND_UP)).add(new BigDecimal(head))).toString(), 2);
               }
           }
            else 
            {
                result = prc;
            }
        }
    }
    catch (Exception e)
    {
        e.printStackTrace();
        result = "&nbsp;";
    }
    return result;
}

public static String getNewsNodeValue(NodeList input, int i)
{
    String output = "";
    NodeList nodeList;
    NodeList temp;
    short type = 0;
    try
    {
        nodeList = ((Element)input.item(i)).getChildNodes();
        //output=((Node)nodeList.item(0)).getNodeValue().trim();
        //System.out.println(nodeList.getLength());
        if (nodeList != null)
        {
            for (int j = 0; j < nodeList.getLength(); j++)
            {
                if (((Node)nodeList.item(j)).getNodeType() == 3)
                    output += ((Node)nodeList.item(j)).getNodeValue().trim();
                else if (((Node)nodeList.item(j)).getNodeType() == 1)
                {
                    temp = ((Element)nodeList.item(j)).getChildNodes();
                    output += ((Node)temp.item(0)).getNodeValue().trim();
                }
            }
        }
     }
    catch (Exception e)
    {
        e.printStackTrace();
        output = "";
    }
    return output;
}

/* return value = b - a / a * 100*/
private String getCalValue4(String stra, String strb)
{
    BigDecimal a = new BigDecimal(0);
    BigDecimal b = new BigDecimal(0);
    try
    {
        if (stra != null && !stra.equals("") && !stra.equals("na"))
        {
            a = new BigDecimal(stra);
        }
        if (strb != null && !strb.equals("") && !strb.equals("na"))
        {
            b = new BigDecimal(strb);
        }
        if (a != null && b != null && stra != null && strb != null && !stra.equals("0.00") && !strb.equals("0.00") && !stra.equals("na")
        && !strb.equals("na") && !stra.equals("0.0000"))
        {
            return roundUp((((b.subtract(a)).divide(a, 4, BigDecimal.ROUND_UP)).multiply(new BigDecimal(100))).toString(), 2);
        }
        else if (stra.equals("0.00") && strb.equals("0.00"))
        {
            return "0";
        }
    }
    catch (Exception ex)
    {
        return "--";
    }
    return "--";
}

/* return value = a - b */
private String getCalValue9(String stra, String strb)
{
    BigDecimal a = new BigDecimal(0);
    BigDecimal b = new BigDecimal(0);
    BigDecimal result = new BigDecimal(0);
    try
    {
        if (stra != null && !stra.equals("") && !stra.equals("--"))
        {
            a = new BigDecimal(stra);
            result = result.add(a);
        }
        if (strb != null && !strb.equals("") && !strb.equals("--"))
        {
            b = new BigDecimal(strb);
            result = result.subtract(b);
        }
        return roundUp(result.toString(), 2);
    }
    catch (Exception ex)
    {
        return "--";
    }
        //return "--";
}
public String getTrdtime(String lasttime, String close_date, String lastdate)
{
    String strlast_month = "";
    int last_month = 0;
    int last_day = 0;
    int now_month = 0;
    int now_year = 0;
    int now_day = 0;
    int now_hour = 0;
    int now_minute = 0;
    String str_trade_month = "";
    int int_trade_month = 0;
    int int_trade_day = 0;
    int int_trade_year = 0;
    boolean isTradeDay = true;
    if (lasttime.equals(":")){
        lasttime = convertDateTimeZone(close_date);
    }
    else {
        if (lastdate.equals("")){
            lasttime = convertDateTimeZone(close_date, lasttime);
        }
        else {
            lasttime = convertDateTimeZone(lastdate, lasttime);
        }
     }
    return lasttime;
}
private String convertTimeZone(String time){
    if (time != null && time.length() >= 5 && time.indexOf(":") > -1){
        try {
            int hour = Integer.parseInt(time.substring(0, 2));
            int minute = Integer.parseInt(time.substring(3, 5));
            TimeZone gmtTZ = TimeZone.getTimeZone("GMT");
            GregorianCalendar cal = new GregorianCalendar(gmtTZ);
            cal.set(Calendar.HOUR_OF_DAY, hour);
            cal.set(Calendar.MINUTE, minute);
            int getHour=0;
            int getMinute=0;
            getHour = cal.get(Calendar.HOUR_OF_DAY);
            getMinute = cal.get(Calendar.MINUTE);
            cal.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
            getHour = cal.get(Calendar.HOUR_OF_DAY);
            getMinute = cal.get(Calendar.MINUTE);
            String strHour="";
            String strMinute="";
            if (getHour<10){strHour = "0"+getHour;}
            else {strHour = ""+getHour;}
            if (getMinute<10){strMinute = "0"+getMinute;}
            else {strMinute = ""+getMinute;}
            time = strHour+":"+strMinute;
        } catch (Exception ex) {
            time =  "--";
        }
    }
    else {
        time = "--";
    }
    return time;
}

//20101203 add by Pong
private String formatOSEFXJapanDate(String date){

        String time="";    
    try{
        int last_day;
        int last_month;
        String strlast_month = "";
        if (date != null && date.length() >=7)
        {
        last_day = Integer.parseInt(date.substring(0, 2));
        strlast_month = date.substring(2, 5);
        if (strlast_month.equals("JAN")){last_month=0;}
        else if (strlast_month.equals("FEB")){last_month=1;}
        else if (strlast_month.equals("MAR")){last_month=2;}
        else if (strlast_month.equals("APR")){last_month=3;}
        else if (strlast_month.equals("MAY")){last_month=4;}
        else if (strlast_month.equals("JUN")){last_month=5;}
        else if (strlast_month.equals("JUL")){last_month=6;}
        else if (strlast_month.equals("AUG")){last_month=7;}
        else if (strlast_month.equals("SEP")){last_month=8;}
        else if (strlast_month.equals("OCT")){last_month=9;}
        else if (strlast_month.equals("NOV")){last_month=10;}
        else {last_month=11;}

        if (last_day!=99 && last_month!=99){
            
            
            last_month = last_month + 1;
            
            String strDay="";
            String strMonth="";
            if (last_day<10){strDay = "0"+last_day;}
            else {strDay = ""+last_day;}
            if (last_month<10){strMonth = "0"+last_month;}
            else {strMonth = ""+last_month;}
            time = strMonth +"/"+strDay;
        }else {time = "--";}
        }
        else
        {
            time = "--";
        }
        } catch (Exception ex) {
            time = "--";
        }
        return time;    
          
}


private String convertDateTimeZone_OSEFX(String date , String time){
    
    //logic
    /*
    1. check if the time is "--", show "-- --" for the date and time
    if the time is valid, compare the system time and TRADE_DATE & TRDTIM_1
    if the system time is smaller than (TRADE_DATE & TRDTIM_1), the trade date should be rollback 1 day
    else just showing TRADE_DATE & TRDTIM_1.
    
    p.s. the input time is JST after formatted
    */ 
    String formattedInputTime = convertTimeZone(time);// format to hh:mm    
    if(formattedInputTime==null || "--".equals(formattedInputTime)){
        return "-- --";
    }
    
    //date information for the input trade date
    int day = -1;
    int month = -1;
    int year = -1;
    
    try{
        if (date != null && date.length() >=7)
        {           
            day = Integer.parseInt(date.substring(0, 2));
            String strMonth = date.substring(2, 5);
            
            if (strMonth.equals("JAN")){month=0;}
            else if (strMonth.equals("FEB")){month=1;}
            else if (strMonth.equals("MAR")){month=2;}
            else if (strMonth.equals("APR")){month=3;}
            else if (strMonth.equals("MAY")){month=4;}
            else if (strMonth.equals("JUN")){month=5;}
            else if (strMonth.equals("JUL")){month=6;}
            else if (strMonth.equals("AUG")){month=7;}
            else if (strMonth.equals("SEP")){month=8;}
            else if (strMonth.equals("OCT")){month=9;}
            else if (strMonth.equals("NOV")){month=10;}
            else {month=11;}
            
            year = 2000 + Integer.parseInt(date.substring(5,7));
        }
            
    }catch(Exception e2){}
    finally{
        if(day == -1 || month == -1 || year == -1){
            return "-- --";
        }
    }
    
    try{            
            String [] strArr = formattedInputTime.split(":");
            int hour = -1;
            int minute = -1;

            if(strArr.length >= 2){
                hour = Integer.parseInt(strArr[0]);
                minute = Integer.parseInt(strArr[1]);
            }
            
            if(hour != -1 && minute != -1){

                
               GregorianCalendar tradeDateTime = new GregorianCalendar(year,month,day,hour,minute);
                Date tDate = new Date(year,month,day,hour,minute);
                
                
                GregorianCalendar nowJST = new GregorianCalendar();
                nowJST.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
                nowJST.add(Calendar.MINUTE, 5);
                
                int nYear = nowJST.get(Calendar.YEAR);
                int nDay = nowJST.get(Calendar.DATE);
                int nMonth = nowJST.get(Calendar.MONTH);
                int nHour = nowJST.get(Calendar.HOUR_OF_DAY);
                int nMinute = nowJST.get(Calendar.MINUTE);                
                
                Date nDate = new Date(nYear,nMonth,nDay,nHour,nMinute);

                //int compareResult = tradeDateTime.compareTo(nowJST);
                int compareResult = tDate.compareTo(nDate);
                
                if (compareResult > 0){                    
                    tradeDateTime.add(Calendar.DATE, -1);
                }
                
                int tmpMonth = tradeDateTime.get(Calendar.MONTH) + 1;
                int tmpDay = tradeDateTime.get(Calendar.DATE);
                
                String outputDay="";
                String outputMonth="";
                if (tmpDay<10){outputDay = "0"+tmpDay;}
                else {outputDay = ""+tmpDay;}
                if (tmpMonth<10){outputMonth = "0"+tmpMonth;}
                else {outputMonth = ""+tmpMonth;}
                
                return outputMonth +"/"+outputDay + " " + formattedInputTime;                
                
            }
            else{
                return "-- --";
            }
    
    }
    catch(Exception e){return "-- --";}
    
}

private String convertDateTimeZone(String date){
        String time="";    
    try{
        int last_day;
        int last_month;
        String strlast_month = "";
        if (date != null && date.length() >=7)
        {
        last_day = Integer.parseInt(date.substring(0, 2));
        strlast_month = date.substring(2, 5);
        if (strlast_month.equals("JAN")){last_month=0;}
        else if (strlast_month.equals("FEB")){last_month=1;}
        else if (strlast_month.equals("MAR")){last_month=2;}
        else if (strlast_month.equals("APR")){last_month=3;}
        else if (strlast_month.equals("MAY")){last_month=4;}
        else if (strlast_month.equals("JUN")){last_month=5;}
        else if (strlast_month.equals("JUL")){last_month=6;}
        else if (strlast_month.equals("AUG")){last_month=7;}
        else if (strlast_month.equals("SEP")){last_month=8;}
        else if (strlast_month.equals("OCT")){last_month=9;}
        else if (strlast_month.equals("NOV")){last_month=10;}
        else {last_month=11;}

        if (last_day!=99 && last_month!=99){
            int hour = 0;
            int minute = 0;
            TimeZone gmtTZ = TimeZone.getTimeZone("GMT");
            GregorianCalendar cal = new GregorianCalendar(gmtTZ);
            cal.set(Calendar.DATE, last_day);
            cal.set(Calendar.MONTH, last_month);
            cal.set(Calendar.HOUR_OF_DAY, hour);
            cal.set(Calendar.MINUTE, minute);
            /*int getDay=0;
            int getMonth=0;
            int getHour=0;
            int getMinute=0;*/
            last_day = cal.get(Calendar.DATE);
            last_month = cal.get(Calendar.MONTH) + 1;
            hour = cal.get(Calendar.HOUR_OF_DAY);
            minute = cal.get(Calendar.MINUTE);
            cal.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
            last_day = cal.get(Calendar.DATE);
            last_month = cal.get(Calendar.MONTH) + 1;
            hour = cal.get(Calendar.HOUR_OF_DAY);
            minute = cal.get(Calendar.MINUTE);
            String strDay="";
            String strMonth="";
            if (last_day<10){strDay = "0"+last_day;}
            else {strDay = ""+last_day;}
            if (last_month<10){strMonth = "0"+last_month;}
            else {strMonth = ""+last_month;}
            time = strMonth +"/"+strDay;
        }else {time = "--";}
        }
        else
        {
            time = "--";
        }
        } catch (Exception ex) {
            time = "--";
        }
        return time;
}

private String convertDateTimeZone(String date, String lasttime){
    String time="";
try {       
    int last_day;
    int last_month;
    int hour;
    int minute;
    String strlast_month = "";
    if (date != null && date.length() >= 7 && lasttime != null && lasttime.length() >= 5)
    {
        last_day = Integer.parseInt(date.substring(0, 2));
        strlast_month = date.substring(2, 5);
        hour = Integer.parseInt(lasttime.substring(0, 2));
        minute = Integer.parseInt(lasttime.substring(3, 5));
        if (strlast_month.equals("JAN")){last_month=0;}
        else if (strlast_month.equals("FEB")){last_month=1;}
        else if (strlast_month.equals("MAR")){last_month=2;}
        else if (strlast_month.equals("APR")){last_month=3;}
        else if (strlast_month.equals("MAY")){last_month=4;}
        else if (strlast_month.equals("JUN")){last_month=5;}
        else if (strlast_month.equals("JUL")){last_month=6;}
        else if (strlast_month.equals("AUG")){last_month=7;}
        else if (strlast_month.equals("SEP")){last_month=8;}
        else if (strlast_month.equals("OCT")){last_month=9;}
        else if (strlast_month.equals("NOV")){last_month=10;}
        else {last_month=11;}
        
        if (last_day!=99 && last_month!=99){
            TimeZone gmtTZ = TimeZone.getTimeZone("GMT");
            GregorianCalendar cal = new GregorianCalendar(gmtTZ);
            cal.set(Calendar.DATE, last_day);
            cal.set(Calendar.MONTH, last_month);
            cal.set(Calendar.HOUR_OF_DAY, hour);
            cal.set(Calendar.MINUTE, minute);
            int getDay=0;
            int getMonth=0;
            int getHour=0;
            int getMinute=0;
            getDay = cal.get(Calendar.DATE);
            getMonth = cal.get(Calendar.MONTH) + 1;
            getHour = cal.get(Calendar.HOUR_OF_DAY);
            getMinute = cal.get(Calendar.MINUTE);
                       
            cal.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));
            getDay = cal.get(Calendar.DATE);
            getMonth = cal.get(Calendar.MONTH) + 1;
            getHour = cal.get(Calendar.HOUR_OF_DAY);
            getMinute = cal.get(Calendar.MINUTE);
            String strDay="";
            String strMonth="";
            if (getDay<10){strDay = "0"+getDay;}
            else {strDay = ""+getDay;}
            if (getMonth<10){strMonth = "0"+getMonth;}
            else {strMonth = ""+getMonth;}
            time = strMonth +"/"+strDay;
        }else {
            time = "--";
        }
    }
    else
    {
        time = "--";
    }
    } catch (Exception ex){
        time = "--";
    }
    return time;
}

public String[] getDisplayDateTime(String sdate, String stime){
    //input date : TRADE_DATE , time : TRDTIM_1
    String[] dt = { "", "" };
    dt[0] = convertDateTimeZone(sdate, stime);                                               
    dt[1] = convertTimeZone(stime);
    
    java.util.Date today = new java.util.Date();
    GregorianCalendar cal = new GregorianCalendar();
    cal.setGregorianChange(today);
    cal.add(Calendar.MINUTE, 10); // ten mins buffer
    today = cal.getTime();
    String[] tdt = { "", "" };    
    SimpleDateFormat sdf1 = new SimpleDateFormat("ddMMMyy");    
    SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");    
    tdt[0] = convertDateTimeZone(sdf1.format(today).toUpperCase(), sdf2.format(today));                                               
    tdt[1] = convertTimeZone(sdf2.format(today));
    
    if(!dt[0].equals("--") && !dt[1].equals("--")){
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd HH:mm");
        try {
            today = sdf.parse(tdt[0] + " " + tdt[1]);
            java.util.Date date = sdf.parse(dt[0] + " " + dt[1]);
            if(date.after(today)){
                dt[0] = "";                     
                dt[1] = convertTimeZone(stime);
            } else {
                dt[0] = convertDateTimeZone(sdate, stime);                                               
                dt[1] = convertTimeZone(stime);
            }
        } catch (Exception ex) {
            dt[0] = "--";
            dt[1] = "--";
        }
    }           
    return dt;
}
public String getNetChange(String last, String close)
{
    BigDecimal lastBD = new BigDecimal(0);
    BigDecimal closeBD = new BigDecimal(0);
    try
    {
        if (last != null && !last.equals(""))
        {
            lastBD = new BigDecimal(last);
        }
        if (close != null && !close.equals(""))
        {
            closeBD = new BigDecimal(close);
        }
        if (lastBD != null && closeBD != null && !lastBD.equals("0.0000"))
        {
            //System.out.println(lastBD + "," + closeBD);
            String result = lastBD.subtract(closeBD).toString();
            result = result.replace("0.0000", "0.00");
            if (result.length() >0 && result.charAt(0) != '-' && !result.equals("0.00"))
                result = "+" + result;
            //return lastBD.subtract(closeBD).toString();
            return result;
        }
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return "--";
    }
    return "--";
}

private String getPercentageChange(String last, String close)
{
    BigDecimal lastBD = new BigDecimal(0);
    BigDecimal closeBD = new BigDecimal(0);
    try
    {
        if (last != null && !last.equals(""))
        {
            lastBD = new BigDecimal(last);
        }
        if (close != null && !close.equals(""))
        {
            closeBD = new BigDecimal(close);
        }
        if (lastBD != null && closeBD != null && !last.equals("0.0000"))
        {
            String result = lastBD.subtract(closeBD).multiply(new BigDecimal("100")).divide(closeBD, 2, BigDecimal.ROUND_UP).toString() + "%";
            
            if (result.length() >0 && result.charAt(0) != '-' && !result.equals("0.00%") && !result.equals("0.0000%"))
                result = "+" + result;
            return  result;
        }
    }
    catch (Exception e)
    {
        return "--";
    }
    return "--";
}

public String hideZeroFXNetKeepScale(String str)
{
    String temp = "&nbsp;";
    if (str != null && /*!str.equals("0.0") && !str.equals("-0.00") && !str.equals("-0.000") && !str.equals("-0.0000") && !str.equals("-0.0") && 
        !str.equals("0") &&*/ !str.equals("") /*&& !str.equals("0.00000")*/ && !str.equals("&nbsp;"))
    {
        temp = str;
        if (temp.indexOf("-") < 0 && temp.indexOf("+") < 0 && !temp.equals("&nbsp;"))
        {
            temp = "+" + temp;
        }
    }
    return temp;
}

public String formatTurnover(String input)
{
    if (input != null && !input.equals("") && !input.equals("--"))
    {
        if (input.equals("0.0"))
            return "0";
        else
            return addComma(roundUp(input, 2));
    }
    return "--";
}
public String formatVol(String input)
{
    if (input != null && !input.equals("") && !input.equals("--"))
    {
        if (input.equals("0.0"))
            return "0";
        else
            return addComma(input);
    }
    return "--";
}

private String getPrice(String temp)
{
    if (temp == null || temp.equals("0") || temp.equals("0.0"))
        return "--";
    else
        return addComma(temp);
}

private String getTime(String temp)
{
    if (temp == null || temp.equals(":"))
        return "--:--";
    else
        return convertTimeZone(temp);
}

private String getNetChange(String temp)
{
    if (temp == null)
        return "--";
    else
    {
        if (temp.length() > 0 && !temp.equals("0") && temp.charAt(0) != '-')
            temp = "+" + temp;
        
        return addComma(temp);
    }
}

private String getPctChange(String temp)
{
    if (temp == null)
        return "--";
    else
    {
        if (temp.length() > 0 && !temp.equals("0") && temp.charAt(0) != '-')
            temp = "+" + temp;
        
        return addComma(temp);
    }
}

private String getVolume(String temp)
{
    if (temp == null || temp.equals("0") || temp.equals("0.0"))
        return "--";
    else
        return addComma(temp);
}

private String isNegative(String str){
    try {
        if(str.length() > 0 && str.startsWith("-") && !str.startsWith("-", 1))
            return "tdneg";
    } catch (Exception e){
        e.printStackTrace();
    }
    return "";
}

    //20091125-1 add by Pong
   String [] getSymbolsArray(String rics){
    String [] result = null ;
    
    if(rics.equals("")){
        return null;
    }
    
    try{
        result = rics.split(";");
    }
    catch(Exception e){result = null;}
    finally{
        return result;
    }
    
   }
   
   String [] getNeighbourRics(String target, String[] ricArr){
       String [] result = null;
       
       try{
           
           if(ricArr!=null && ricArr.length > 0){
               int matchIndex = -1;
               for(int i=0; i< ricArr.length; i++){
                   if(ricArr[i].equals(target)){
                       matchIndex = i;
                       break;
                   }
               }
               //cannot find the target ric inside the ricarray
               if(matchIndex < 0 || matchIndex >= ricArr.length){
                   return null;
               }
               else{
                   result = new String[2];
                   result[0] = null;
                   result[1] = null;
                   int prevIndex = matchIndex - 1;
                   int nextIndex = matchIndex + 1;
                   if(  prevIndex >= 0 && prevIndex < ricArr.length -1 ){
                       result[0] = ricArr[prevIndex];
                   }
                   if(  nextIndex >= 1 && nextIndex < ricArr.length ){
                       result[1] = ricArr[nextIndex];
                   }  
               }
           }
           
       }catch(Exception e){return null;}
       finally{
           return result;
       }
   }

   String [] getNeighbourRics(String target, String[] ricArr, int idx){
       String [] result = null;
       
       try{
           if(ricArr!=null && ricArr.length > 0){
               int matchIndex = -1;
               for(int i=0; i< ricArr.length; i++){
                   if (idx >= 0 && i > idx)
                       break;
                   if(ricArr[i].equals(target)){
                       matchIndex = i;
                       
                       if (idx >= 0 && matchIndex == idx)
                            break;
                       else if (idx < 0)
                           break;
                       
                   }
               }
               //cannot find the target ric inside the ricarray
               if(matchIndex < 0 || matchIndex >= ricArr.length){
                   return null;
               }
               else{
                   result = new String[2];
                   result[0] = null;
                   result[1] = null;
                   int prevIndex = matchIndex - 1;
                   int nextIndex = matchIndex + 1;
                   if(  prevIndex >= 0 && prevIndex < ricArr.length -1 ){
                       result[0] = ricArr[prevIndex];
                   }
                   if(  nextIndex >= 1 && nextIndex < ricArr.length ){
                       result[1] = ricArr[nextIndex];
                   }  
               }
           }
           
       }catch(Exception e){return null;}
       finally{
           return result;
       }
   }
   
   
   String getRicDisplay (String input){
       String result=input;
       
       try{
           String[] arr = input.split("\\.");
           if(arr != null && arr.length == 2){
               result = arr[0];
           }
           
       }catch(Exception e){}
       finally{
           return result ;
       }
   }
   
    //get all symbols and pass to quote frame page as string format seperated by ";"
    String getAllSymbols(Vector vec){
        String result = "";
        
        try{
            if(vec != null && vec.size() > 0){
                for(int i=0; i< vec.size(); i++){
                    Map map = (Map)vec.get(i);
                    if(map != null){
                        String symbol = "";
                        try{
                            symbol = (String) map.get("SYMBOL");
                        }
                        catch(Exception e2){}
                        if(symbol != null && symbol.equals("") == false){
                            if(result.equals("")){
                                result = symbol;
                            }
                            else{
                                result = result + ";" + symbol;
                            }
                        }                        
                    }                    
                }
            }
        }
        catch(Exception e){}
        finally{
            return result;
        }
        
    }     
   
    
//20100915 add by Pong
//OSE/JQ Merge
public String getNewJasdaqCode(String input){
    
    String result=input;
    
    
    if(input != null){
//        if(input.endsWith("Q")){
        if(input.endsWith(".Q")){
            result = input.replace("Q","OS");
        }
//        else if(input.endsWith("OJ")){
        else if(input.endsWith(".OJ")){
            result = input.replace("OJ","OS");
        }
    }
    
    return result;
    
}    
//20091125-1 end Pong
   
public String formatMonthToNum(String month)
{
    if (month.equals("JAN"))
        month = "01";
    else if (month.equals("FEB"))
        month = "02";
    else if (month.equals("MAR"))
        month = "03";
    else if (month.equals("APR"))
        month = "04";
    else if (month.equals("MAY"))
        month = "05";
    else if (month.equals("JUN"))
        month = "06";
    else if (month.equals("JUL"))
        month = "07";
    else if (month.equals("AUG"))
        month = "08";
    else if (month.equals("SEP"))
        month = "09";
    else if (month.equals("OCT"))
        month = "10";
    else if (month.equals("NOV"))
        month = "11";
    else if (month.equals("DEC"))
        month = "12";

    return month;
}

public String formatContactMonth(String value){
    String year = "";
    String month = "";

    if (value.length() == 11 && value.charAt(2) == ' ' && value.charAt(6) == ' ')
    {
        year = value.substring(9);
        month = value.substring(3, 6);
    }
    else if (value.length() == 9 && value.charAt(2) == ' ' && value.charAt(6) == ' ')
    {
        year = value.substring(7);
        month = value.substring(3, 6);
    }
    else if (value.length() == 7){
        year = value.substring(5);
        month = value.substring(2,5);
    }


    month = formatMonthToNum(month);

    return year + "/" + month;
}

      
    //notes
    //20091125-1 : V1.14 display news in bewteen ranking table   
%>