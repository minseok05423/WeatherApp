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



6\. SearchBar

-when using svg where a url is needed, convert to base64 using btoa

-use "new" to create a new instance(object) with the constructor function inside a class

&nbsp;  -Worst case: TypeError: Class constructor Size cannot be invoked without 'new'



7\. Map

-if you use key props, you will forcefully re-render the component

-component re-renders when 1. props change 2. parent element re-renders

-by using export default React.memo(Map), the Map component re-renders only when the props change, preventing excessive re-renders

-useEffect vs useMemo: use useMemo when you need the data during render

-useEffect runs after render so it won't be able to provide calculations during render



8\. MainCity

-strings have the slice() method

-In TypeScript object type annotations, you need both the property name AND the type - you can't just put the type alone

-use the full keyword for react fragments when adding in keys

-custom separation border code snippet: className={`w-full h-full ${index < 24 \&\& index > 0 ? 'custom-border' : ''}`}

-creating types like this: 

type HourWeather =

&nbsp; City\['weather']\['forecast']\['forecastday']\[number]\['hour']\[number];

looks janky

**-use interfaces instead**



9\. Forecast

-do not use indices as keys



10\. ForecastCard



11\. LoadingSpinner

-need to import type CSSProperties 

-"?:" refer to the optional props



12\. GeoLoadingSpinner



13\. ElementContext

-create custom hook to modularize context hooks

-although you should not overuse contexts as it make components not reusable



14\. useGeoLocation

-don't forget to clear intervals or timeouts when unmounting



15\. useReverseGeocoding

-when using fetch, .ok returns true or false based on the data status

-Error is a class, so throw new Error creates a new instance of Error and bubbles that up to the nearest try-catch block

-without throw, everything would run normally even when an error has occured

-".json()" requires await as it returns a promise; it takes time for parsing

-"instanceof" check the Error class to see if it is an instance of the Error class



16\. useWeatherAPI

-when importing api keys in vite, use import.meta.env.(api key variable name)



17\. weather

-I should have put all the types in here for cleaner code



18\. localStorage

-use window.localStorage to acces localStorage

-always use try-catch block



19\. useLocalStorage

-"as" is TypeScript type assertion

-use it when you know more than ts about the type

-function inside useState is a lazy function, it executes only at mount



20\. weatherIcon

-maybe i could have gone for includes() for all the single values for cleaner code



21\. App.css

-does not matter

-ignore



22\. App.tsx

-JSON APIs can return various structures, but your specific API returns predictable data

-Define interfaces that match your API response structure for better type safety

-Static array prevents "LoadScript reloaded unintentionally" performance warnings

-o.w. it would load the libraries every re-render

-Literal type 'places'\[] restricts to valid Google Maps libraries vs generic string\[]

-if i were to make a hook, i would have had to make a function, not just export a variable

-no need to specify the type for the set function as react does that automatically

-Destructuring extracts properties by name, not position

-even when setInterval is assigned to a const, it still runs

-Date() is a constructor function

**-use Promise.all to wait until all promises are resolved**

-don't forget to call functions after defining them when function calls are required

-use self executing functions to do so

-you could use useRef patterns to see previous values before change

-you cannot use an array that change sizes for dependencies

-use let and define it outside the if statements to use variables in the outer scope

-in order to call cityList, which is outside HandleSearchValue,

-we must use useState to see the current state..this is a classic javascript closure problem

-could use useRef patterns

-choose between the two depending on whether or not you want to re-rendering

-in my code, i think should have gone for useRef

-must put return at the end as set~() function cannot be a void function

-like the code snippet below, use "nullish coalescing chaining" or "fallback chaining" for safe code

location.results?.\[3]?.formatted\_address ??

location.results?.\[4]?.formatted\_address ??

location.results?.\[5]?.formatted\_address ??

'Unknown location';

**-**conditional rendering is goated

-you can absolutely use hover: pesudo classes in tailwind



-SVG attributes override CSS properties - remove stroke="currentColor" from SVG to let Tailwind stroke-\* classes work



-min-h prevents text line-height from collapsing container height

-Text with small line-height can make containers shorter than expected

-min-h ensures containers maintain minimum visual height



-shrink-0 + w-full combination overrides flex item shrinking

-flex items shrink by default when space is limited

-shrink-0 prevents unwanted compression of important elements



-w-fit creates tight-fitting containers around content

-Container width matches content width exactly

-Prevents unnecessary whitespace around text/elements

-Useful for buttons, tags, and dynamic content sizing



23\. index.css

-":root" is what controls the whole styling

-CSS @layer Priority System (highest to lowest):

&nbsp; 1. Inline styles (style="...")           - Always wins

&nbsp; 2. Regular CSS (no @layer)               - Your custom styles here

&nbsp; 3. @layer utilities (Tailwind utilities) - .text-center, .flex, etc.

&nbsp; 4. @layer components (components)        - .btn, .card, etc.

&nbsp; 5. @layer base (resets/defaults)         - Basic HTML styling



&nbsp; This means: Your custom CSS always overrides Tailwind utilities,

&nbsp; but Tailwind utilities can override base HTML styles

-"::" is a pseudo element

-when overriding a style, use !important

-some companies like google use pseudo elements to display logos -> you would need to target it specifically



24\. env

-dont forget to add .env files to gitignore

-"VITE\_" prefix exposes the api keys to the client

-to hide it, you need to move it to server side via backend





















