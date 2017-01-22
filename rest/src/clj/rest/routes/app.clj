(ns rest.routes.app
  (:require [rest.layout :as layout]
            [compojure.core :refer [defroutes GET]]))

(defroutes app-routes (GET "/*" [] (layout/render "app.html")))
