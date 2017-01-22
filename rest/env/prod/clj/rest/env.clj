(ns rest.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[rest started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[rest has shut down successfully]=-"))
   :middleware identity})
