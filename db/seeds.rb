# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'csv'

def run_seeding
  # Act.destroy_all
  # import_raks

  create_demo_user
  create_demo_user_completions(@demo_user)
end

def import_raks
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'raks.csv'))
  csv = CSV.parse(csv_text, headers: true, encoding: 'utf-8')
  csv.each do |row|
    a = Act.new
    a.title = row['title']
    a.description = row['description']
    a.save
  end
  puts "There are now #{Act.count} rows in the acts table"
end

def create_demo_user
  User.find_by_email("test@test.com")&.destroy
  @demo_user = User.create!(email: 'test@test.com', password: 'password', password_confirmation: 'password')
end

def create_demo_user_completions(demo_user)
  acts = Act.all
  acts.sample(10).each do |act|
    rand(0..20).times do
      Completion.create!(user_id: demo_user.id, act_id: act.id, created_at: Faker::Time.between(from: DateTime.now - 365.days, to: DateTime.now))
    end
  end
end

run_seeding
