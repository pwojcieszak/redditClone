package com.pwojcieszak.redditCloneBackend.service;

import com.pwojcieszak.redditCloneBackend.dto.SubredditDto;
import com.pwojcieszak.redditCloneBackend.model.Subreddit;
import com.pwojcieszak.redditCloneBackend.repository.SubredditRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditService {

    private final SubredditRepository subredditRepository;

    @Transactional
    public SubredditDto save(SubredditDto subredditDto) {
        Subreddit save = subredditRepository.save(mapDtoToSubreddit(subredditDto));
        subredditDto.setId(save.getId());
        return subredditDto;
    }

    private Subreddit mapDtoToSubreddit(SubredditDto subredditDto) {
        return Subreddit.builder()
                .name(subredditDto.getName())
                .description(subredditDto.getDescription())
                .build();
    }

    @Transactional(readOnly = true)
    public List<SubredditDto> getAll() {
        return subredditRepository.findAll()
                .stream()
                .map(this::mapSubredditToDto)
                .collect(Collectors.toList());
    }

    private SubredditDto mapSubredditToDto(Subreddit subreddit) {
        return SubredditDto.builder()
                .id(subreddit.getId())
                .name(subreddit.getName())
                .description(subreddit.getDescription())
                .numberOfPosts(subreddit.getPosts().size())
                .build();
    }
}
