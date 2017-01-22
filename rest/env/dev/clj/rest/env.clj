(ns rest.env
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [rest.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[rest started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[rest has shut down successfully]=-"))
   :middleware wrap-dev})
