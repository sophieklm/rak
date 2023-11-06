class CreateUserActs < ActiveRecord::Migration[7.0]
  def change
    create_table :user_acts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :act, null: false, foreign_key: true

      t.timestamps
    end
  end
end
