package com.liu233w.acm_statistics.backend.repository;

import com.liu233w.acm_statistics.backend.domain.CrawlerUsernameSet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CrawlerUsernameSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrawlerUsernameSetRepository extends JpaRepository<CrawlerUsernameSet, Long> {

}
