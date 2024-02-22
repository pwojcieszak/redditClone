package com.pwojcieszak.redditCloneBackend.repository;

import com.pwojcieszak.redditCloneBackend.model.Post;
import com.pwojcieszak.redditCloneBackend.model.Subreddit;
import com.pwojcieszak.redditCloneBackend.model.User;
import io.micrometer.common.KeyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubredditOrderByCreatedDateDesc(Subreddit subreddit);
    List<Post> findByUserOrderByCreatedDateDesc(User user);
    List<Post> findAllByOrderByCreatedDateDesc();
}
