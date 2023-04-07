class Channeldes < ActiveRecord::Migration[7.0]
  def change

    add_column :channels, :description, :string
  end

end
