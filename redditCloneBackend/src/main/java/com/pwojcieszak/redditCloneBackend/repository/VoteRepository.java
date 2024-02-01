package com.pwojcieszak.redditCloneBackend.repository;

import com.pwojcieszak.redditCloneBackend.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
}
