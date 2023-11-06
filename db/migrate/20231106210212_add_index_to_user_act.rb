class AddIndexToUserAct < ActiveRecord::Migration[7.0]
  def change
    add_index :user_acts, [:user_id, :act_id], unique: true
  end
end
