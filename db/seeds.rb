# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'csv'

def run_seeding
  Act.destroy_all
  import_raks
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

run_seeding
