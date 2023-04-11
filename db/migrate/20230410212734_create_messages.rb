class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|

      t.references :author, foreign_key: {to_table: :users}, null: false, index: true
      t.string :content, null: false
      t.references :context, foreign_key: {to_table: :channels}, null: false, index: true

      t.timestamps
    end
  end
end
