require 'spec_helper'

describe "cat model" do
  describe "validations" do
      describe Cat do
        it { should validate_presence_of(:nickname) }
      end
      describe Cat do
        it { should validate_uniqueness_of(:nickname) }
      end
  end
end
