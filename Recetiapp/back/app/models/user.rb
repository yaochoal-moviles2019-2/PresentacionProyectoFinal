class User < ApplicationRecord
    has_many :orders
    scope :search_google_id, -> (google_id){where("google_id LIKE ?",google_id)}
end
