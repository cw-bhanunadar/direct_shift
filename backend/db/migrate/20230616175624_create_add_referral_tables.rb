class CreateAddReferralTables < ActiveRecord::Migration[6.0]
  def change
    create_table :referrals do |t|
      t.string :referred_by
      t.string :name
      t.string :email
      t.string :status, default: 'pending'
      t.timestamps
    end
  end
end
