class CreateServerSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :server_subscriptions do |t|

      t.references :subscriber, foreign_key: {to_table: :users}, index: true, null: false
      t.references :server, foreign_key: {to_table: :servers}, index: true, null: false



      t.timestamps
    end

    add_index :server_subscriptions, [:subscriber_id, :server_id], unique: true
  end
end
