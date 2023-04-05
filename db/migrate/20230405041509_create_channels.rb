class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|

      t.timestamps
    end
  end
end