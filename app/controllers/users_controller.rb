class UsersController < ApplicationController
  before_action :find_user, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  def index
    @users = User.all
    respond_with(@users) do |format|
      format.json { render :json => @users }
    end
  end

  def show
    render :json => @user
  end

  def new
    @user = User.new
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
    render :json => @user
  end

  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :ok}
  end

  private

  def find_user
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end

end