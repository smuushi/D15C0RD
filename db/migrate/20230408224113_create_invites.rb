class CreateInvites < ActiveRecord::Migration[7.0]
  def change
    create_table :invites do |t|
      t.references :server, foreign_key: {to_table: :servers}, index: true, null: false
      t.timestamps
    end
  end
end
