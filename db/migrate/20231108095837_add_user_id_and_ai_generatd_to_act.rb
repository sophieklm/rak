class AddUserIdAndAiGeneratdToAct < ActiveRecord::Migration[7.0]
  def change
    add_column :acts, :user_id, :integer
    add_column :acts, :ai_generated, :boolean, default: false
  end
end
