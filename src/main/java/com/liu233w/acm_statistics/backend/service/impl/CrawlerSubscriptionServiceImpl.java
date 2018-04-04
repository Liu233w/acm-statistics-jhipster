package com.liu233w.acm_statistics.backend.service.impl;

import com.liu233w.acm_statistics.backend.service.CrawlerSubscriptionService;
import com.liu233w.acm_statistics.backend.domain.CrawlerSubscription;
import com.liu233w.acm_statistics.backend.repository.CrawlerSubscriptionRepository;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerSubscriptionDTO;
import com.liu233w.acm_statistics.backend.service.mapper.CrawlerSubscriptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CrawlerSubscription.
 */
@Service
@Transactional
public class CrawlerSubscriptionServiceImpl implements CrawlerSubscriptionService {

    private final Logger log = LoggerFactory.getLogger(CrawlerSubscriptionServiceImpl.class);

    private final CrawlerSubscriptionRepository crawlerSubscriptionRepository;

    private final CrawlerSubscriptionMapper crawlerSubscriptionMapper;

    public CrawlerSubscriptionServiceImpl(CrawlerSubscriptionRepository crawlerSubscriptionRepository, CrawlerSubscriptionMapper crawlerSubscriptionMapper) {
        this.crawlerSubscriptionRepository = crawlerSubscriptionRepository;
        this.crawlerSubscriptionMapper = crawlerSubscriptionMapper;
    }

    /**
     * Save a crawlerSubscription.
     *
     * @param crawlerSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CrawlerSubscriptionDTO save(CrawlerSubscriptionDTO crawlerSubscriptionDTO) {
        log.debug("Request to save CrawlerSubscription : {}", crawlerSubscriptionDTO);
        CrawlerSubscription crawlerSubscription = crawlerSubscriptionMapper.toEntity(crawlerSubscriptionDTO);
        crawlerSubscription = crawlerSubscriptionRepository.save(crawlerSubscription);
        return crawlerSubscriptionMapper.toDto(crawlerSubscription);
    }

    /**
     * Get all the crawlerSubscriptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CrawlerSubscriptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CrawlerSubscriptions");
        return crawlerSubscriptionRepository.findAll(pageable)
            .map(crawlerSubscriptionMapper::toDto);
    }

    /**
     * Get one crawlerSubscription by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CrawlerSubscriptionDTO findOne(Long id) {
        log.debug("Request to get CrawlerSubscription : {}", id);
        CrawlerSubscription crawlerSubscription = crawlerSubscriptionRepository.findOne(id);
        return crawlerSubscriptionMapper.toDto(crawlerSubscription);
    }

    /**
     * Delete the crawlerSubscription by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CrawlerSubscription : {}", id);
        crawlerSubscriptionRepository.delete(id);
    }
}
