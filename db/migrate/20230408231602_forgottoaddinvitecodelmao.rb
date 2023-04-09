class Forgottoaddinvitecodelmao < ActiveRecord::Migration[7.0]
  def change
    add_column :invites, :invite_code, :string, null: false

    add_index :invites, :invite_code, unique: true
  end
end
