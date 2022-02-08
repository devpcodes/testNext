var APP_CONFIG = {
    VERSION: "1.29.0",
   //  DataAPIPath: "https://t1www5.trkd-hs.com/sinopacwidget2", //staging
     DataAPIPath: window.location.hostname.indexOf('webrd') >=0 ? "/lykan/api/v1/labci/sinopacwidget": 'https://hkhsm.trkd-hs.com/sinopacwidget', //staging
    //  DataAPIPath: "https://t1hkhsm.trkd-hs.com/sinopacwidget", //staging
    //DataAPIPath: "https://www5.trkd-hs.com/sinopacwidget", //prod
    WDS_MAX_IDLE_TIME: 60,
    WDS_USER: 'sinopac',
    WDS_PROVISION_URL: 'https://wdsp.trkd-hs.com/wds-provision/wdsprovision'
};
