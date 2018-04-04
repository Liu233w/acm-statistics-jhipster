package com.liu233w.acm_statistics.backend.repository;

import com.liu233w.acm_statistics.backend.domain.CrawlerSubscription;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CrawlerSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrawlerSubscriptionRepository extends JpaRepository<CrawlerSubscription, Long> {

}
