class EditTag < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :tag, :string
  end
end
