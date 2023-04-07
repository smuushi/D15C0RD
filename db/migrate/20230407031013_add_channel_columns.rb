class AddChannelColumns < ActiveRecord::Migration[7.0]
  def change
  
    add_column :channels, :name, :string, null: false
    add_reference :channels, :server, index: true, null: false
  
  end
end
