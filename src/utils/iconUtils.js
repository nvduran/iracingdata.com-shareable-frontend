// src/utils/iconUtils.js

export const getIconFileName = (seasonName) => {
        // Example: Map "Ferrari GT3 Challenge - 2024 Season 3 - Fixed" to "Ferrari GT3 Challenge"
        if (seasonName.includes("Ferrari GT3 Challenge")) {
                return "Ferrari GT3 Challenge";
        }
        if (seasonName.includes("Porsche iRacing Cup")) {
                return "Porsche iRacing Cup";
        }
        if (seasonName.includes("Advanced Legends Cup")) {
                return "Advanced Legends Cup";
        }
        if (seasonName.includes("Advanced MAZDA MX-5 Cup")) {
                return "Advanced MAZDA MX-5 Cup Series";
        }
        if (seasonName.includes("GT Endurance Series")) {
                return "GT Endurance Series";
        }
        if (seasonName.includes("Global Mazda MX-5 Fanatec Cup")) {
                return "Global Mazda MX5 Fanatec Cup";
        }
        if (seasonName.includes("FIA Formula 4 Challenge - 2024 Season 3")) {
                return "FIA Formula 4 Challenge";
        }
        if (seasonName.includes("FIA Formula 4 Challenge- 2024 Season 3 - Fixed")) {
                return "FIA Formula 4 Challenge - Fixed";
        }
        //GT3 Fanatec Challenge
        if (seasonName.includes("GT3 Fanatec Challenge")) {
                return "GT3 Fanatec Challenge";
        }
        //Production Car Sim-Lab Challenge
        if (seasonName.includes("Production Car Sim-Lab Challenge - 2024 Season 3")) {
                return "SimLab Production Car Challenge";
        }
        //GT Sprint VRS Series
        if (seasonName.includes("GT Sprint Simucube Series")) {
                return "GT Sprint Series";
        }
        //Global Endurance Pure Driving School Tour
        if (seasonName.includes("Global Endurance Pure Driving School Tour")) {
                return "Global Endurance Pure Driving School Tour";
        }
        //IMSA Michelin Pilot Challenge
        if (seasonName.includes("IMSA Michelin Pilot Challenge")) {
                return "IMSA Michelin Pilot Challenge";
        }
        //Formula 1600 Rookie Sim-Motion Series
        if (seasonName.includes("Formula 1600 Rookie Sim-Motion Series - 2024 Season 3 Fixed")) {
                return "Formula 1600 Rookie Series - Fixed";
        }
        //Formula Vee SIMAGIC Series - 2024 Season 3 Fixed
        if (seasonName.includes("Formula Vee SIMAGIC Series - 2024 Season 3 Fixed")) {
                return "Formula Vee SIMAGIC Series";
        }
        //Gen 4 Cup - Fixed - 2024 Season 3 Fixed
        if (seasonName.includes("Gen 4 Cup - Fixed - 2024 Season 3 Fixed")) {
                return "Gen 4 Cup - Fixed";
        }
        //IMSA iRacing Series - 2024 Season 3
        if (seasonName.includes("IMSA iRacing Series - 2024 Season 3")) {
                return "IMSA iRacing Series";
        }
        //GT4 Falken Tyre Challenge - 2024 Season 3 Fixed
        if (seasonName.includes("GT4 Falken Tyre Challenge - 2024 Season 3 Fixed")) {
                return "GT4 Falken Tires Challenge Fixed";
        }
        //Falken Tyre Sports Car Challenge - 2024 Season 3
        if (seasonName.includes("Falken Tyre Sports Car Challenge - 2024 Season 3")) {
                return "Falken Tires Sports Car Challenge";
        }
        //ARCA Menards Series - 2024 Season 3 - Fixed
        if (seasonName.includes("ARCA Menards Series - 2024 Season 3 - Fixed")) {
                return "ARCA Menards Series";
        }
        //Ring Meister Ricmotech Series - 2024 Season 3
        if (seasonName.includes("Ring Meister Ricmotech Series - Fixed")) {
                return "Ricmotech Ring Meister";
        }
        //Draft Master - 2024 Season 3
        if (seasonName.includes("Draft Master")) {
                return "Draft Master SIMAGIC Series";
        }
        //Formula B - Super Formula IMSIM Series - Fixed - 2024 Season 3
        if (seasonName.includes("Formula B - Super Formula IMSIM Series - Fixed - 2024 Season 3")) {
                return "Formula B - Super Formula IMSIM Series - Fixed";
        }
        //NASCAR Class C Maconi Setup Shop Fixed - 2024 Season 3 Fixed
        if (seasonName.includes("NASCAR Class C Maconi Series - Fixed - 2024 Season 3")) {
                return "NASCAR Class C - Maconi Setup Shop - Fixed";
        }
        //FIA F4 Esports Regional Tour - Americas - 2024 Season 3
        if (seasonName.includes("FIA F4 Esports Regional Tour")) {
                return "FIA Formula 4 Challenge";
        }
        //US Open Wheel C - Dallara IR-18 - Fixed - 2024 Season 3
        if (seasonName.includes("US Open Wheel C - Dallara IR-18 - Fixed - 2024 Season 3")) {
                return "US Open Wheel C - Dallara IR18 Oval - Fixed";
        }
        //NASCAR Class B Fixed - 2024 Season 3 Fixed
        if (seasonName.includes("NASCAR Class B Fixed - 2024 Season 3 Fixed")) {
                return "NASCAR Class B - Xfinity Series";
        }
        //CARS Late Model Stock Tour - Fixed - 2024 Season 3
        if (seasonName.includes("CARS Late Model Stock Tour - Fixed - 2024 Season 3")) {
                return "Late Model Stock Tour - Fixed";
        }
        //Street Stock Fanatec Series - R - 2024 Season 3 Fixed
        if (seasonName.includes("Street Stock Fanatec Series - R - 2024 Season 3 Fixed")) {
                return "Street Stock Fanatec Rookie Series";
        }
        //IMSA iRacing Series - Fixed - 2024 Season 3
        if (seasonName.includes("IMSA iRacing Series - Fixed - 2024 Season 3")) {
                return "IMSA iRacing Series - Fixed";
        }
        //GTE Sprint Pure Driving School Series - 2024 Season 3
        if (seasonName.includes("GTE Sprint Pure Driving School Series - 2024 Season 3")) {
                return "GTE Sprint Pure Driving School Series";
        }
        //Rookie Legends VRS Cup - 2024 Season 3
        if (seasonName.includes("Rookie Legends Cup")) {
                return "Rookie Legends Cup";
        }
        //Formula B - Super Formula IMSIM Series - 2024 Season 3
        if (seasonName.includes("Formula B - Super Formula IMSIM Series - 2024 Season 3")) {
                return "Formula B - Super Formula IMSIM Series";
        }
        //NASCAR Class A Fixed - 2024 Season 3 Fixed
        if (seasonName.includes("NASCAR Class A Fixed - 2024 Season 3 Fixed")) {
                return "NASCAR Class A - Cup Series";
        }
        //Rookie DIRTcar Street Stock Series - Fixed - 2024 Season 3
        if (seasonName.includes("Rookie DIRTcar Street Stock Series - Fixed - 2024 Season 3")) {
                return "Rookie DIRTcar Street Stock Series";
        }
        //Formula C - Thrustmaster Dallara F3 Series -2024 Season 3-Fixed
        if (seasonName.includes("Formula C - Thrustmaster Dallara F3 Series -2024 Season 3-Fixed")) {
                return "Formula C - DOF Reality Dallara F3 Championship";
        }
        //GR Buttkicker Cup - 2024 Season 3 - Fixed
        if (seasonName.includes("GR Buttkicker Cup - 2024 Season 3 - Fixed")) {
                return "GR Buttkicker Cup";
        }
        //Carburetor Cup - 2024 Season 3
        if (seasonName.includes("Carburetor Cup - 2024 Season 3")) {
                return "Carburetor Cup";
        }
        //Spec Racer Ford Challenge - 2024 Season 3
        if (seasonName.includes("Spec Racer Ford Challenge - 2024 Season 3")) {
                return "Spec Racer Ford Challenge";
        }
        //DIRTcar 358 Modified Engine Ice Series - 2024 Season 3 Fixed
        if (seasonName.includes("DIRTcar 358 Modified")) {
                return "DIRTcar 358 Modified";
        }
        //NASCAR iRacing Class C Series - 2024 Season 3
        if (seasonName.includes("NASCAR iRacing Class C Series")) {
                return "NASCAR Class C - Truck Series";
        }
        //NASCAR Class A - 2024 Season 3
        if (seasonName.includes("NASCAR Class A - 2024 Season 3")) {
                return "NASCAR Class A - Cup Series";
        }
        //Formula C - DOF Reality Dallara F3 Series - 2024 Season 3
        if (seasonName.includes("Formula C - DOF Reality Dallara F3 Series - 2024 Season 3")) {
                return "Formula C - DOF Reality Dallara F3 Championship";
        }
        //CARS Late Model Stock Tour - 2024 Season 3
        if (seasonName.includes("CARS Late Model Stock Tour - 2024 Season 3")) {
                return "Late Model Stock Tour";
        }
        //LMP2 Prototype Challenge - 2024 Season 3 - Fixed
        if (seasonName.includes("LMP2 Prototype Challenge")) {
                return "LMP2 Prototype Challenge";
        }
        if (seasonName.includes("Proto-GT Thrustmaster")) {
                return "Thrustmaster ProtoGT Challenge";
        }
        //LMP3 Turn Racing Trophy - 2024 Season 3 - Fixed
        if (seasonName.includes("LMP3 Turn Racing Trophy")) {
                return "Turn LMP3 Trophy";
        }
        //Street Stock Next Level Racing Series - C - 2024 Season 3
        if (seasonName.includes("Street Stock Next Level Racing Series - C - 2024 Season 3")) {
                return "Street Stock Next Level Racing Series";
        }
        //DIRTcar 305 Sprint Car Fanatec Series - 2024 Season 3 Fixed
        if (seasonName.includes("DIRTcar 305 Sprint Car Fanatec Series - 2024 Season 3 Fixed")) {
                return "DIRTcar 305 Sprint Fanatec Series";
        }
        //Advanced Mazda MX-5 Cup Series - 2024 Season 3
        if (seasonName.includes("Advanced Mazda MX-5 Cup Series - 2024 Season 3")) {
                return "Advanced MAZDA MX-5 Cup Series";
        }
        //Kamel GT Championship - 2024 Season 3
        if (seasonName.includes("Kamel GT Championship - 2024 Season 3")) {
                return "Kamel GT";
        }
        //Rookie Pro 2 Lite Off-Road Racing Series - Fixed - 2024 Season 3
        if (seasonName.includes("Rookie Pro 2 Lite Off-Road Racing Series - Fixed - 2024 Season 3")) {
                return "Rookie Pro 2 Lite Off-Road iRacing Series";
        }
        //Rookie iRX Volkswagen Beetle Lite - Fixed - 2024 Season 3
        if (seasonName.includes("Rookie iRX Volkswagen Beetle Lite - Fixed - 2024 Season 3")) {
                return "Rookie iRX Volkswagen Beetle Lite - Fixed";
        }
        //DIRTcar Limited Late Model Series - 2024 Season 3 Fixed
        if (seasonName.includes("DIRTcar Limited Late Model Series - 2024 Season 3 Fixed")) {
                return "DIRTcar Limited Late Model Series";
        }
        //World of Outlaws Late Model Series - 2024 Season 3 - Fixed
        if (seasonName.includes("World of Outlaws Late Model Series - 2024 Season 3 - Fixed")) {
                return "World of Outlaws Sprint Car Series - Fixed";
        }
        //Dirt Super Late Model Tour - 2024 Season 3
        if (seasonName.includes("Dirt Super Late Model Tour -")) {
                return "Dirt Super Late Model Tour";
        }
        //skippy
        if (seasonName.includes("Skip Barber Race Series - 2024 Season 3")) {
                return "Skip Barber Race Series";
        }
        //Touring Car Challenge - Fixed - 2024 Season 3
        if (seasonName.includes("Touring Car Challenge - Fixed - 2024 Season 3")) {
                return "Touring Car Turn Racing Challenge - Fixed";
        }
        //NASCAR Legends Series - 2024 Season 3 Fixed
        if (seasonName.includes("NASCAR Legends Series - 2024 Season 3 Fixed")) {
                return "NASCAR Legends Series - neg";
        }
        //PickUp Cup - 2024 Season 3
        if (seasonName.includes("PickUp Cup - 2024 Season 3")) {
                return "PickUp Cup";
        }
        //Super Late Model Series - Fixed - 2024 Season 3 - Fixed
        if (seasonName.includes("Super Late Model Series - Fixed - 2024 Season 3 - Fixed")) {
                return "Late Model Stock Tour - Fixed";
        }
        //Formula 1600 Thrustmaster Trophy - 2024 Season 3
        if (seasonName.includes("Formula 1600 Thrustmaster Trophy - 2024 Season 3")) {
                return "Formula 1600 Trophy";
        }
        //World of Outlaws Late Model Series - 2024 Season 3
        if (seasonName.includes("World of Outlaws Late Model Series - 2024 Season 3")) {
                return "World of Outlaws Case Construction Late Models";
        }
        //SK Modified Series - 2024 Season 3 - Fixed
        if (seasonName.includes("SK Modified Series - 2024 Season 3 - Fixed")) {
                return "SK Modified Weekly Series - Fixed";
        }
        //DIRTcar Pro Late Model Series - 2024 Season 3
        if (seasonName.includes("DIRTcar Pro Late Model Series - 2024 Season 3")) {
                return "DIRTcar Pro Late Model Series";
        }
        //DIRTcar UMP Modified Series - 2024 Season 3 - Fixed
        if (seasonName.includes("DIRTcar UMP Modified Series - 2024 Season 3 - Fixed")) {
                return "DIRTcar UMP Modified Series";
        }
        //Touring Car Challenge - 2024 Season 3
        if (seasonName.includes("Touring Car Challenge - 2024 Season 3")) {
                return "Touring Car Turn Racing Challenge";
        }
        //Silver Crown Cup - 2024 Season 3
        if (seasonName.includes("Silver Crown Cup - 2024 Season 3")) {
                return "Silver Crown Cup";
        }
        //DIRTcar Pro Late Model Series - Fixed - 2024 Season 3
        if (seasonName.includes("DIRTcar Pro Late Model Series - Fixed - 2024 Season 3")) {
                return "DIRTcar Pro Late Model Series - Fixed";
        }
        //Pro 4 Off-Road Racing Series - Fixed - 2024 Season 3
        if (seasonName.includes("Pro 4 Off-Road Racing Series - Fixed - 2024 Season 3")) {
                return "Pro 4 Off-Road iRacing Series";
        }
        //Dirt Midget Cup - Fixed - 2024 Season 3
        if (seasonName.includes("Dirt Midget Cup - Fixed - 2024 Season 3")) {
                return "Dirt Midget Cup Fixed";
        }
        //DIRTcar Class C Dirt Street Stock Series - 2024 Season 3 Fixed
        if (seasonName.includes("DIRTcar Class C Dirt Street Stock Series - 2024 Season 3 Fixed")) {
                return "DIRTcar Class C Street Stock Series - Fixed";
        }
        //DIRTcar 360 Sprint Car Carquest Series - 2024 Season 3
        if (seasonName.includes("DIRTcar 360 Sprint Car Series")) {
                return "DIRTcar 360 Sprint Car Series";
        }
        //NASCAR Tour Modified Series - Fixed - 2024 Season 3 - Fixed
        if (seasonName.includes("NASCAR Tour Modified Series - Fixed - 2024 Season 3 - Fixed")) {
                return "NASCAR Tour Modified Series";
        }
        //iRacing Classic Lotus Grand Prix- 2024 Season 3
        if (seasonName.includes("iRacing Classic Lotus Grand Prix- 2024 Season 3")) {
                return "Classic Lotus Grand Prix";
        }
        //DIRTcar 360 Sprint Car Carquest Series - Fixed 2024 Season 3
        if (seasonName.includes("360 Sprint Car Series - Fixed")) {
                return "DIRTcar 360 Sprint Car Series - Fixed";
        }
        //Radical Racing Challenge- 2024 Season 3 - Fixed
        if (seasonName.includes("Radical Racing Challenge- 2024 Season 3 - Fixed")) {
                return "Radical Racing Challenge";
        }
        //Grand Prix Legends - 2024 Season 3
        if (seasonName.includes("Grand Prix Legends - 2024 Season 3")) {
                return "Grand Prix Legends";
        }
        //Big Block Modified Series - Fixed - 2024 Season 3
        if (seasonName.includes("Big Block Modified Series - Fixed - 2024 Season 3")) {
                return "SUPER DIRTcar Big Block Modified Series - Fixed";
        }
        //Big Block Modified Series - 2024 Season 3
        if (seasonName.includes("Big Block Modified Series - 2024 Season 3")) {
                return "SUPER DIRTcar Big Block Modified Series";
        }
        //SK Modified Weekly Series - 2024 Season 3
        if (seasonName.includes("SK Modified Weekly Series - 2024 Season 3")) {
                return "SK Modified Weekly Series - Open";
        }
        //World of Outlaws Sprint Car Series - 2024 Season 3 - Fixed
        if (seasonName.includes("World of Outlaws Sprint Car Series - 2024 Season 3 - Fixed")) {
                return "World of Outlaws Sprint Car Series - Fixed";
        }
        //Sprint Car Cup - 2024 Season 3
        if (seasonName.includes("Sprint Car Cup - 2024 Season 3")) {
                return "Sprint Car Cup";
        }
        //US Open Wheel D - USF 2000 Series - 2024 Season 3 - Fixed
        if (seasonName.includes("US Open Wheel D - USF 2000 Series")) {
                return "US Open Wheel D - USF 2000 Series";
        }
        //iRX Volkswagen Beetle Lite - 2024 Season 3
        if (seasonName.includes("iRX Volkswagen Beetle Lite - 2024 Season 3")) {
                return "iRX Volkswagen Beetle Lite";
        }
        //Supercars Series - Australian Servers - 2024 Season 3
        if (seasonName.includes("Supercars Series - Australian Servers - 2024 Season 3")) {
                return "Supercars";
        }
        //Clio Cup - 2024 Season 3 - Fixed
        if (seasonName.includes("Clio Cup - 2024 Season 3 - Fixed")) {
                return "Clio Ricmotech  Cup - Fixed";
        }
        //World of Outlaws Sprint Car Series - 2024 Season 3
        if (seasonName.includes("World of Outlaws Sprint Car Series - 2024 Season 3")) {
                return "World Of Outlaws Sprint Car Series - Fixed";
        }
        //NASCAR Tour Modified Series - 2024 Season 3
        if (seasonName.includes("NASCAR Tour Modified Series - 2024 Season 3")) {
                return "NASCAR Tour Modified Series";
        }
        //GT Thrustmaster Challenge - 2024 Season 3
        if (seasonName.includes("GT Thrustmaster Challenge - 2024 Season 3")) {
                return "Thrustmaster GT Challenge";
        }
        //Super Late Model Series - 2024 Season 3
        if (seasonName.includes("Super Late Model Series - 2024 Season 3")) {
                return "Late Model Stock Tour";
        }
        //Dirt 410 Sprint Car Tour - 2024 Season 3
        if (seasonName.includes("Dirt 410 Sprint Car Tour - 2024 Season 3")) {
                return "Dirt 410 Sprint Car Tour - Fixed";
        }
        //Dirt Midget Cup - 2024 Season 3
        if (seasonName.includes("Dirt Midget Cup - 2024 Season 3")) {
                return "Dirt Midget Cup Fixed";
        }
        //Supercars Series - 2024 Season 3
        if (seasonName.includes("Supercars Series - 2024 Season 3")) {
                return "Supercars";
        }
        //Mustang Skip Barber Challenge - 2024 Season 3 - Fixed
        if (seasonName.includes("Mustang Skip")) {
                return "Skip Barber Mustang Challenge - Fixed";
        }
        //US Open Wheel B - Dallara IR-18 - 2024 Season 3
        if (seasonName.includes("US Open Wheel B - Dallara IR-18 - 2024 Season 3")) {
                return "US Open Wheel B - Dallara IR18 Series";
        }
        //Rallycross Series - Fixed - 2024 Season 3
        if (seasonName.includes("Rallycross Series - Fixed - 2024 Season 3")) {
                return "iRacing Rallycross Series - Fixed";
        }
        //US Open Wheel C - Indy Pro 2000 Series - 2024 Season 3
        if (seasonName.includes("US Open Wheel C - Indy Pro 2000 Series - 2024 Season 3")) {
                return "US Open Wheel C - Indy Pro 2000 Series";
        }
        //Global Fanatec Challenge - 2024 Season 3 - Fixed
        if (seasonName.includes("Global Fanatec Challenge - 2024 Season 3 - Fixed")) {
                return "Fanatec Global Challenge";
        }
        //Dirt Legends Cup - 2024 Season 3
        if (seasonName.includes("Dirt Legends Cup - 2024 Season 3")) {
                return "Dirt Legends Cup";
        }
        //Pro 4 Off-Road Racing Series - 2024 Season 3
        if (seasonName.includes("Pro 4 Off-Road Racing Series - 2024 Season 3")) {
                return "Pro 4 Off-Road iRacing Series";
        }
        //Mission R Challenge - 2024 Season 3 - Fixed
        if (seasonName.includes("Mission R Challenge - 2024 Season 3 - Fixed")) {
                return "MissionR Challenge";
        }
        //Rallycross Series - 2024 Season 3
        if (seasonName.includes("Rallycross Series - 2024 Season 3")) {
                return "iRacing Rallycross Series";
        }
        //Formula B - Formula Renault 3.5 Series - 2024 Season 3
        if (seasonName.includes("Formula B - Formula Renault 3.5 Series - 2024 Season 3")) {
                return "Formula B - Renault 3.5 Series";
        }
        //USAC 360 Sprint Car Series - 2024 Season 3
        if (seasonName.includes("USAC 360 Sprint Car Series")) {
                return "USAC 360 Sprint Car Series";
        }
        //Dallara Formula iR - Fixed - 2024 Season 3
        if (seasonName.includes("Dallara Formula iR - Fixed - 2024 Season 3")) {
                return "Dallara Formula iR";
        }
        //Formula A - Grand Prix Series - 2024 Season 3
        if (seasonName.includes("Formula A - Grand Prix Series - 2024 Season 3")) {
                return "Formula A - Grand Prix Series";
        }
        //Pro 2 Off-Road Racing Series - Fixed - 2024 Season 3
        if (seasonName.includes("Pro 2 Off-Road Racing Series - Fixed - 2024 Season 3")) {
                return "Pro 2 Off-Road iRacing Series";
        }
        //Pro 2 Off-Road Racing Series - 2024 Season 3
        if (seasonName.includes("Pro 2 Off-Road Racing Series - 2024 Season 3")) {
                return "Pro 2 Off-Road iRacing Series";
        }
        //AMSOIL USAC Sprint Car - Fixed 2023 - Season 4
        if (seasonName.includes("AMSOIL USAC Sprint Car - Fixed 2023 - Season 4")) {
                return "AMSOIL USAC Sprint Car";
        }
        //Dallara Dash - 2024 Season 3
        if (seasonName.includes("Dallara Dash - 2024 Season 3")) {
                return "Dallara Dash";
        }
        //Stock Car Brasil - 2024 Season 3 - Fixed
        if (seasonName.includes("Stock Car Brasil - 2024 Season 3 - Fixed")) {
                return "Stock Car Brasil";
        }
        if (seasonName.includes("Formula A - Grand Prix Series - Fixed - 2024 Season 3")) {
                return "Formula A - Grand Prix Series - Fixed";
        }
        //eNASCAR RTP Contender Series 2023 Season
        if (seasonName.includes("eNASCAR RTP")) {
                return "eNASCAR iRacing Series";
        }
        if (seasonName.includes("IMSA Endurance Series")) {
                return "IMSA Endurance Series";
        }
        if (seasonName.includes("Winter iRacing NASCAR Series - Fixed")) {
                return "Winter iRacing NASCAR Series - Fixed";
        }

        if (seasonName.includes("Winter iRacing NASCAR Series")) {
                return "Winter iRacing NASCAR Series";
        }

        if (seasonName.includes("NASCAR iRacing Class B Series")) {
                return "NASCAR Class B - Xfinity Series";
        }
        if (seasonName.includes("Porsche Cup By Coach Dave Delta - Fixed")) {
                return "iRacing Porsche Series Fixed";
        }
        if (seasonName.includes("Porsche Cup By Coach Dave Delta")) {
                return "iRacing Porsche Series Open";
        }
        if (seasonName.includes("Radical Esports Cup - Fixed")) {
                return "Radical Esports Cup Logo";
        }
        if (seasonName.includes("Weekly Race Challenge")) {
                return "iRacing Weekly Challenge";
        }
        if (seasonName.includes("Dirt 410 Sprint Car Tour")) {
                return "Dirt 410 Sprint Car Tour";
        }
        if (seasonName.includes("IMSA Vintage Series")) {
                return "IMSA Vintage Series";
        }
        if (seasonName.includes("AMSOIL USAC Sprint Car")) {
                return "AMSOIL USAC Sprint Car";
        }
        if (seasonName.includes("NASCAR iRacing Series")) {
                return "NASCAR iRacing Series";
        }
        if (seasonName.includes("INDYCAR Series")) {
                return "INDYCAR Series - Fixed";
        }
        if (seasonName.includes("Formula C - Super Formula Lights - Fixed")) {
                return "Formula C - Super Formula Lights Series - Fixed";
        }
        if (seasonName.includes("Formula C - Super Formula Lights")) {
                return "Formula C - Super Formula Lights Series";
        }
        if (seasonName.includes("Rookie Micro Winged Sprint Car Series - Fixed")) {
                return "Rookie Micro Winged Sprint Car Series - Fixed";
        }
        if (seasonName.includes("Rookie DIRTcar")) {
                return "Rookie DIRTcar Street Stock MOZA Racing Series - Fixed";
        }
        if (seasonName.includes("LMP3 Trophy - Fixed")) {
                return "LMP3 Trophy";
        }
        if (seasonName.includes("GTE Sprint CONSPIT")) {
                return "GTE Sprint Conspit Series";
        }
        if (seasonName.includes("TCR Virtual Challenge - Fixed")) {
                return "iRacing TCR Virtual Challenge Series - Fixed";
        }
        if (seasonName.includes("TCR Virtual Challenge")) {
                return "iRacing TCR Virtual Challenge Series - Open";
        }
        if (seasonName.includes("Outlaw Micro Showdown 2024 Season 3")) {
                return "Outlaw Micro Showdown";
        }
        if (seasonName.includes("BMW M Power Tour")) {
                return "BMW M Power Tour";
        }
        if (seasonName.includes("Rookie Micro Non Wing Sprint Car Series - Fixed - 2024 Season 3")) {
                return "Rookie Micro Winged Sprint Car Series - Fixed";
        }
        if (seasonName.includes("SRX Series - Fixed - 2024 Season 3")) {
                return "SRX Series - Fixed";
        }

        return "iRacing-Icon-BW-White"; // A default icon if no specific match is found
};
