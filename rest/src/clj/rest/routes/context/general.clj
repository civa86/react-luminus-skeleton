(ns rest.routes.context.general
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [rest.db.core :refer [*db*] :as db]
            [schema.core :as s]
            [clojure.string :as str]))

(def SHEET [{:label "Full Name" :fields [:firstname :lastname]}
            {:label "Email" :fields [:email]}])

(defn extract-from-item
  [item fields]
  (into [] (->> fields
                (map #(reduce (fn [m v] (conj m (get item v ""))) [] %))
                (map #(into [] %))
                (map #(remove nil? %))
                (map #(str/join ", " %))
                ))
  )

(defn generate-sheet [items struct]
  (let [header (map #(get % :label) struct)
        fields (map #(get % :fields []) struct)
        entries (map #(extract-from-item % fields) items)
        ]

    (clojure.pprint/pprint [(into [] header) (into [] entries)])
    )

  )

(def ctx-general
  (context "/" []

    (GET "/" []
      :return s/Any
      :summary ""
      (log/info "[API] /")
      (ok {:version (System/getProperty "rest.version")}))

    ;TODO remove...just a test
    (GET "/download" []
      :return s/Any
      :summary ""
      (generate-sheet (db/get-users) SHEET)
      (ok {:version (System/getProperty "rest.version")}))

    (GET "/*" request
      :return s/Any
      :summary "Not Matched Api Route"
      (log/info "[API] " (get request :path-info) " not found")
      (not-found {:code 404 :error "Resource not found"}))
    ))
