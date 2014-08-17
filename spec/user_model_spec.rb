require 'spec_helper'

describe "user model" do
  describe "validations" do
      describe User do
        it { should validate_presence_of(:fullname) }
      end
      describe User do
        it { should validate_presence_of(:email) }
      end
      describe User do
        it { should validate_presence_of(:password_hash) }
      end
      describe User do
        it { should validate_uniqueness_of(:email) }
      end
  end
end
