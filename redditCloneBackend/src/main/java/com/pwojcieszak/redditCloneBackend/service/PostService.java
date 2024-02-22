package com.pwojcieszak.redditCloneBackend.service;

import com.pwojcieszak.redditCloneBackend.dto.PostRequest;
import com.pwojcieszak.redditCloneBackend.dto.PostResponse;
import com.pwojcieszak.redditCloneBackend.exceptions.PostNotFoundException;
import com.pwojcieszak.redditCloneBackend.exceptions.SubredditNotFoundException;
import com.pwojcieszak.redditCloneBackend.mapper.PostMapper;
import com.pwojcieszak.redditCloneBackend.model.Post;
import com.pwojcieszak.redditCloneBackend.model.Subreddit;
import com.pwojcieszak.redditCloneBackend.model.User;
import com.pwojcieszak.redditCloneBackend.repository.PostRepository;
import com.pwojcieszak.redditCloneBackend.repository.SubredditRepository;
import com.pwojcieszak.redditCloneBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final SubredditRepository subredditRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PostMapper postMapper;

    @Transactional
    public void save(PostRequest postRequest) {
        Subreddit subreddit = subredditRepository.findByName(postRequest.getSubredditName())
                .orElseThrow(() -> new SubredditNotFoundException(postRequest.getSubredditName()));
        postRepository.save(postMapper.map(postRequest, subreddit, authService.getCurrentUser()));
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id.toString()));
        return postMapper.mapToDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedDateDesc()
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsBySubreddit(Long subredditId) {
        Subreddit subreddit = subredditRepository.findById(subredditId)
                .orElseThrow(() -> new SubredditNotFoundException(subredditId.toString()));
        List<Post> posts = postRepository.findAllBySubredditOrderByCreatedDateDesc(subreddit);
        return posts.stream().map(postMapper::mapToDto).collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return postRepository.findByUserOrderByCreatedDateDesc(user)
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }
}
