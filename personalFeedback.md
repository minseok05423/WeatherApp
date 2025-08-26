**📁 Project Structure**



**phase2/**

**├── public/                    # Static assets served directly**

**├── src/**

**│   ├── main.tsx              # ⭐ App entry point**

**│   ├── App.tsx               # 🏠 Main app component \& state**

**│   ├── index.css             # 🎨 Global styles \& Tailwind**

**│   ├── components/           # 🧩 Reusable UI components**

**│   ├── hooks/                # 🎣 Custom React hooks**

**│   ├── context/              # 🔄 React Context providers**

**│   ├── utils/                # 🛠️ Utility functions**

**│   └── assets/               # 📦 Images, fonts, icons**

**├── tailwind.config.ts        # ⚙️ Tailwind configuration**

**├── vite.config.ts            # ⚙️ Vite build configuration**

**├── package.json              # 📋 Dependencies \& scripts**

**└── instructions.txt          # 📖 Project requirements**



**🏗️ Application Architecture**



**main.tsx (Entry Point)**

&nbsp;     \*\*↓\*\*


**App.tsx (State Container)**

&nbsp;     \*\*├── SearchBar (Google Places)\*\*

      \*\*├── Map (Interactive Google Map)\*\*

      \*\*├── CityList (Saved Cities Sidebar)\*\*

      \*\*│   └── CityItem\\\[] (Individual city cards)\*\*

      \*\*├── CurrentWeather (User location)\*\*

      \*\*└── MainCity (Selected weather details)\*\*

          \*\*├── DayWeather (24h hourly)\*\*

          \*\*│   └── HourlyWeatherCard\\\[]\*\*

          \*\*└── Forecast (5-day forecast)\*\*

              \*\*└── ForecastCard\\\[]\*\*






**📊 Data Flow Pattern**



**User Input → SearchBar → App State → Weather APIs → UI Update**

&nbsp;      \*\*↕️              ↕️         ↕️           ↕️\*\*


**Map Click → Location → Geocoding → Weather → Display**

&nbsp;      \*\*↕️              ↕️         ↕️           ↕️\*\*


**City Save → LocalStorage → State → UI Refresh**



**🎣 Custom Hooks Architecture**



**useWeatherAPI()**

**├── Fetches weather data**

**├── Manages loading states**

**└── Handles API errors**



**useGeolocation()**

**├── Gets user's location**

**├── Handles permissions**

**└── Error fallbacks**



**useReverseGeocoding()**

**├── Converts coordinates to addresses**

**├── Integrates with Google APIs**

**└── Location name resolution**



**useLocalStorage()**

**├── Persists saved cities**

**├── Handles serialization**

**└── Storage error recovery**



**🔄 State Management Strategy**



**App.tsx (Main State Hub)**

**├── Weather Data State**

**│   ├── searchResult**

**│   ├── selectedCity**

**│   ├── loading/error states**

**│   └── currentLocation**

**│**

**├── City Management State**

**│   ├── cityList (saved cities)**

**│   ├── selectedElementId**

**│   └── savedMessage feedback**

**│**

**├── UI State**

**│   ├── hour (for auto-refresh)**

**│   ├── geoLoaded status**

**│   └── selectedLocation coordinates**

**│**

**└── ElementContext (City Selection)**

&nbsp;     \*\*├── selectedElementId\*\*

      \*\*└── setSelectedElementId\*\*






**🧩 Component Responsibilities**



**| Component      | Purpose                  | Key Features                |**

**|----------------|--------------------------|-----------------------------|**

**| App.tsx        | State orchestrator       | API coordination, data flow |**

**| SearchBar      | Location input           | Google Places autocomplete  |**

**| Map            | Visual location picker   | Click-to-search, markers    |**

**| CityList       | Saved cities display     | Scrollable sidebar list     |**

**| CityItem       | Individual city card     | Weather preview, delete     |**

**| CurrentWeather | User location weather    | Geolocation integration     |**

**| MainCity       | Selected weather details | Full weather display        |**

**| DayWeather     | 24-hour forecast         | Hourly weather cards        |**

**| Forecast       | 5-day forecast           | Daily weather cards         |**



**🔌 API Integration Points**



**OpenWeatherMap API**

**├── Current Weather (/weather)**

**├── 5-Day Forecast (/forecast)**

**└── Error handling \& rate limiting**



**Google Maps APIs**

**├── Places API (autocomplete)**

**├── Maps JavaScript API (map display)**

**├── Geocoding API (coordinates ↔ addresses)**

**└── Reverse Geocoding (location lookup)**



**💾 Data Persistence Strategy**



**LocalStorage Layer**

**├── Key: 'cityList'**

**├── Format: JSON array of City objects**

**├── Auto-sync with state changes**

**└── Error recovery on parse failures**



**City Data Structure:**

**{**

&nbsp;   \*\*cityInfo: \\\[name, region, country, coordinates],\*\*

    \*\*id: timestamp,\*\*

    \*\*weather: OpenWeatherMap response\*\*


**}**



**⚡ Performance Optimizations**



**React Optimizations**

**├── React.memo() on CityItem components**

**├── useRef() for stale closure prevention**

**├── Proper useEffect dependencies**

**└── Component unmount cleanup**



**API Optimizations**

**├── Automatic weather refresh (hourly)**

**├── Coordinate-based weather fetching**

**├── Error boundary patterns**

**└── Loading state coordination**



**🎨 Styling Architecture**



**Tailwind CSS + Custom CSS**

**├── index.css (global styles, fonts)**

**├── Custom scrollbar styles**

**├── Google Maps UI overrides**

**├── @font-face declarations (Lufga)**

**└── Component-level Tailwind classes**



1\. fonts

-download fonts into assets and import them to root css file(with file types in mind via format())



2\. icons

-use as components inside react with vite svgr plugin

-change properties by opening with text editor

-when importing svgs, use the vite import query: ?react to import is as a react component(?raw or ?url for raw string or base64) -> o.w. you would have to use it in a img tag with src



3\. CityList

-when using .map to create multiple child elements, the key prop should be at the direct child elements

-also key props must be unique across DOM to prevent any conflicts



4\. CityItem

-created a new hook(ElementContext) with useContext to avoid prop drilling

-to add prop type to a already existing interface, use \&

ex: {

&nbsp; cityInfo,

&nbsp; id,

&nbsp; weather,

&nbsp; HandleDelete,

}: City **\&** { HandleDelete: (id: number) => void }



-use ?. operator for safety

without ?., if the variable is null or undefined, ts will throw an error

-with it, it will return undefined

-|| provides a safe fallback when the variable is a falsy value(null, undefined, 0, "", false)

-divs are not focusable by default, in order to make them focusable, you would need to add tabIndex{0}

-when using conditional styling, do not leave the else statement part empty

-use curly braces to use backticks

-when calling functions inside functions like arrow functions, useEffect and setTimeout, do not call functions immediately, use arrow functions



5\. CurrentWeather

-if you dont know the type, use generic help functions to let ts infer the type

-do not try to use promises, instead use async + await or .then

-when using conditional rendering for multiple elements, use react fragments to nest

-hooks cannot go inside other hooks



6.SearchBar

-when using svg where a url is needed, convert to base64 using btoa

-use "new" to create a new instance(object) with the constructor function inside a class

&nbsp;  -Worst case: TypeError: Class constructor Size cannot be invoked without 'new'





