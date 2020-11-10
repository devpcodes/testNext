Sinopac Sec Widget

The zip contains code drop for deployed widgets with the following directories
1. lsinopac 
Base directory with all files for code drop

2. lsinopac\css
Directory with CSS stylesheets for code drop

3. lsinopac\images
Directory with images for code drop

4. lsinopac\js
Directory with javascripts for code drop

5. lsinopac\ui
Directory with HTML and other components for code drop



Installation:
1. Unzip the zip files
2. Copy all the files and directories, include folder "lsinopac", to web application
3. Widgets can be called by iFrame with links for deployed widgets and generated token



Links for Deployed Widgets:
1. Indices with basic charting
https://<hostname>/<application path>/lsinopac/ui/worldnav.html?token=<token>&lang=<language>

2. Interactive charting
https://<hostname>/<application path>/lsinopac/ui/quote.html?token=<token>&lang=<language>
Search stocks in stock search textbox and then select "Chart" tab, or select "Chart" in mobile page

3. Basic quote
https://<hostname>/<application path>/lsinopac/ui/quote.html?token=<token>&lang=<language>&symbol=2890&exch=TAI
Search stocks in stock search textbox, default is 2890 in Taiwan Stock Exchange

Parameter:
symbol: code or symbol for stock
exch: exchange fo stock. Here are the values
	TAI: Taiwan Stock Exchange
	HKG: Hong Kong Stock Exchange
	SHH: Shanghai Stock Exchange (China)
	SHZ: Shenzhen Stock Exchange (China)
	NYSE: New York Stock Exchange (US)
	AMEX: American Stock Exchange (US)
	NASDQA: NASDAQ (US)
	PINK: Pink Sheet (US)
	OBB: NASDQA OTC Bulletin Board (US)
	

4. Screener
https://<hostname>/<application path>/lsinopac/ui/screener.html?token=<token>&lang=<language>

5. Stock Report+
https://<hostname>/<application path>/lsinopac/ui/quote.html?token=<token>&lang=<language>
Search stocks in stock search textbox and then select "StockReport+" tab, or select "StockReport+" in mobile page

6. Ranking
https://<hostname>/<application path>/lsinopac/ui/ranking.html?token=<token>&lang=<language>&mkt=TWN&rank=PG
Default ranking is Taiwan Stocks Top % Gainers

Parameter:
mkt: default ranking market / exchange
	TWN: Taiwan Stocks
	TWN_WNT: Taiwan Warrants
	HKG: Hong Kong Market
	HKG_MAIN: Hong Kong Mainboard
	HKG_GEM: Hong Kong GEM board
	SHH: ShangHai A
	SHZ: ShenXhen A
	NYSE: NYSE
	NYSE_AMER: NYSE American
	NYSE_ARCA: NYSE ARCA
	NASDAQ: NasDAQ

rank: default ranking type
	NG: Top Gainers
	NL: Top Losers
	PG: Top % Gainers
	PL: Top % Losers
	AV: Top Volume
	AM: Top Turnover



Parameters / Notations
<hostname>
Server host name

<application path>
Application path for the web application 

<token>
Token for authentication and client information passing

<language>
Language. "en" for English, "zh_TW" for Traditional Chinese (Taiwan), "zh_HK" for Traditional Chinese (Hong Kong), "zh_CN" for Simplified Chinese (China).
Default language is "zh_TW"