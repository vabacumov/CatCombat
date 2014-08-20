describe Cat do

  context "#associations" do
    it { should belong_to :user }
  end

  describe 'post /cats/new' do
    it "returns successful status" do
      post '/cats/new'
      expect(last_response.status).to eq(200)
    end
  end

  # describe 'put /cats/new/attributes' do
  #   it "returns successful status" do

  #     put '/cats/new/attributes'
  #     specify { session[:cat_id].should == 1 }
  #     expect(last_response.status).to eq(200)
  #   end
  # end

  # describe 'get /cats/opponent' do
  #   it "returns successful status" do
  #     put '/cats/opponent'
  #     expect(last_response.status).to eq(200)
  #   end
  # end

  # describe 'put /fight' do
  #   it "returns successful status" do
  #     put '/fight'
  #     expect(last_response.status).to eq(200)
  #   end
  # end



end
