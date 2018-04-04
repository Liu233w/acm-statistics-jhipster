package com.liu233w.acm_statistics.backend.service.impl;

import com.liu233w.acm_statistics.backend.service.CrawlerUsernameSetService;
import com.liu233w.acm_statistics.backend.domain.CrawlerUsernameSet;
import com.liu233w.acm_statistics.backend.repository.CrawlerUsernameSetRepository;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerUsernameSetDTO;
import com.liu233w.acm_statistics.backend.service.mapper.CrawlerUsernameSetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing CrawlerUsernameSet.
 */
@Service
@Transactional
public class CrawlerUsernameSetServiceImpl implements CrawlerUsernameSetService {

    private final Logger log = LoggerFactory.getLogger(CrawlerUsernameSetServiceImpl.class);

    private final CrawlerUsernameSetRepository crawlerUsernameSetRepository;

    private final CrawlerUsernameSetMapper crawlerUsernameSetMapper;

    public CrawlerUsernameSetServiceImpl(CrawlerUsernameSetRepository crawlerUsernameSetRepository, CrawlerUsernameSetMapper crawlerUsernameSetMapper) {
        this.crawlerUsernameSetRepository = crawlerUsernameSetRepository;
        this.crawlerUsernameSetMapper = crawlerUsernameSetMapper;
    }

    /**
     * Save a crawlerUsernameSet.
     *
     * @param crawlerUsernameSetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CrawlerUsernameSetDTO save(CrawlerUsernameSetDTO crawlerUsernameSetDTO) {
        log.debug("Request to save CrawlerUsernameSet : {}", crawlerUsernameSetDTO);
        CrawlerUsernameSet crawlerUsernameSet = crawlerUsernameSetMapper.toEntity(crawlerUsernameSetDTO);
        crawlerUsernameSet = crawlerUsernameSetRepository.save(crawlerUsernameSet);
        return crawlerUsernameSetMapper.toDto(crawlerUsernameSet);
    }

    /**
     * Get all the crawlerUsernameSets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CrawlerUsernameSetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CrawlerUsernameSets");
        return crawlerUsernameSetRepository.findAll(pageable)
            .map(crawlerUsernameSetMapper::toDto);
    }


    /**
     *  get all the crawlerUsernameSets where SubscriptionId is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<CrawlerUsernameSetDTO> findAllWhereSubscriptionIdIsNull() {
        log.debug("Request to get all crawlerUsernameSets where SubscriptionId is null");
        return StreamSupport
            .stream(crawlerUsernameSetRepository.findAll().spliterator(), false)
            .filter(crawlerUsernameSet -> crawlerUsernameSet.getSubscriptionId() == null)
            .map(crawlerUsernameSetMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one crawlerUsernameSet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CrawlerUsernameSetDTO findOne(Long id) {
        log.debug("Request to get CrawlerUsernameSet : {}", id);
        CrawlerUsernameSet crawlerUsernameSet = crawlerUsernameSetRepository.findOne(id);
        return crawlerUsernameSetMapper.toDto(crawlerUsernameSet);
    }

    /**
     * Delete the crawlerUsernameSet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CrawlerUsernameSet : {}", id);
        crawlerUsernameSetRepository.delete(id);
    }
}
