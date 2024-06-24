import React, { useEffect } from "react";

function AdSenseScript({ shouldLoadAds }) {
        useEffect(() => {
                if (shouldLoadAds) {
                        const script = document.createElement("script");
                        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2805561356098125";
                        script.async = true;
                        document.body.appendChild(script);
                }
        }, [shouldLoadAds]);

        return null;
}

export default AdSenseScript;
