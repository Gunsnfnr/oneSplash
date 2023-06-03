import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import userReducer from './user/userSlice';
import feedReducer from './unsplashFeed/feedSlice';
import singlePhotoReducer from './singlePhoto/singlePhotoSlice';
import likesReducer from './likes/likesSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    feed: feedReducer,
    likes: likesReducer,
    singlePhoto: singlePhotoReducer,
  }
}
);
