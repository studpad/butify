class Notification < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  belongs_to :who, class_name: 'User'
  enum mode: { like: 0, follow: 1, recommendation: 2, comment: 3}

  def image_path
    case mode
    when 'like'    then '/images/like_active.png'
    when 'comment' then '/images/chatting.png'
    when 'recommendation'  then '/thumbsup.png'
    when 'follow'  then '/empty.png'
    end
  end
end
