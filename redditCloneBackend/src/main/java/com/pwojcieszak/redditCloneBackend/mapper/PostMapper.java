package com.pwojcieszak.redditCloneBackend.mapper;

import com.pwojcieszak.redditCloneBackend.dto.PostRequest;
import com.pwojcieszak.redditCloneBackend.dto.PostResponse;
import com.pwojcieszak.redditCloneBackend.model.Post;
import com.pwojcieszak.redditCloneBackend.model.Subreddit;
import com.pwojcieszak.redditCloneBackend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "description", source = "postRequest.description")
    @Mapping(target = "subreddit", source = "subreddit")
    @Mapping(target = "user", source = "user")
    Post map(PostRequest postRequest, Subreddit subreddit, User user);

    @Mapping(target = "id", source = "postId")
    @Mapping(target = "subredditName", source = "subreddit.name")
    @Mapping(target = "userName", source = "user.username")
    PostResponse mapToDto(Post post);

}
