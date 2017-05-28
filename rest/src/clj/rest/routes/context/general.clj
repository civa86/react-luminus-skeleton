(ns rest.routes.context.general
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [rest.db.core :refer [*db*] :as db]
            [schema.core :as s]
            [dk.ative.docjure.spreadsheet :as xls]
            [clojure.string :as str]))

(def SHEET [{:label "Full Name" :fields [:firstname :lastname] :separator " - "}
            {:label "Email" :fields [:email]}])

(defn extract-from-item
  [item fields separators]
  (into [] (->> fields
                (map #(reduce (fn [m v] (conj m (get item v ""))) [] %))
                (map #(remove nil? %))
                (map-indexed (fn [i x] (str/join (nth separators i) x))))))

(defn generate-sheet [name items struct]
  (let [header (map #(get % :label) struct)
        fields (map #(get % :fields []) struct)
        separators (map #(get % :separator "") struct)
        entries (map #(extract-from-item % fields separators) items)]

    (xls/create-workbook name
                         (concat [(into [] header)] (into [] entries)))))

(def ctx-general
  (context "/" []

    (GET "/" []
      :return s/Any
      :summary ""
      (log/info "[API] /")
      (ok {:version (System/getProperty "rest.version")}))

    ;TODO remove...just a test
    (GET "/download" []
      ;:return s/Any
      :summary ""
      (do
        (clojure.java.io/delete-file "/tmp/asd.xlsx" true)
        (let [output (as-> (db/get-users) $
                           (generate-sheet "asd" $ SHEET)
                           (xls/save-workbook! "/tmp/asd.xlsx" $)
                           (clojure.java.io/file "/tmp/asd.xlsx"))]
          {:status  200
           :headers {"Content-Disposition" (str "attachment;" "filename=\"asd.xlsx\"" )}
           :body output})
        ))

    (GET "/*" request
      :return s/Any
      :summary "Not Matched Api Route"
      (log/info "[API] " (get request :path-info) " not found")
      (not-found {:code 404 :error "Resource not found"}))
    ))
