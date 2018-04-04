package com.liu233w.acm_statistics.backend.service.impl;

import com.codahale.metrics.annotation.Timed;
import com.liu233w.acm_statistics.backend.security.AuthoritiesConstants;
import com.liu233w.acm_statistics.backend.service.HistoryService;
import com.liu233w.acm_statistics.backend.domain.History;
import com.liu233w.acm_statistics.backend.repository.HistoryRepository;
import com.liu233w.acm_statistics.backend.service.dto.HistoryDTO;
import com.liu233w.acm_statistics.backend.service.mapper.HistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing History.
 */
@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    private final Logger log = LoggerFactory.getLogger(HistoryServiceImpl.class);

    private final HistoryRepository historyRepository;

    private final HistoryMapper historyMapper;

    public HistoryServiceImpl(HistoryRepository historyRepository, HistoryMapper historyMapper) {
        this.historyRepository = historyRepository;
        this.historyMapper = historyMapper;
    }

    /**
     * Save a history.
     *
     * @param historyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public HistoryDTO save(HistoryDTO historyDTO) {
        log.debug("Request to save History : {}", historyDTO);
        History history = historyMapper.toEntity(historyDTO);
        history = historyRepository.save(history);
        return historyMapper.toDto(history);
    }

    /**
     * Get all the histories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public Page<HistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Histories");
        return historyRepository.findAll(pageable)
            .map(historyMapper::toDto);
    }

    /**
     * Get one history by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public HistoryDTO findOne(Long id) {
        log.debug("Request to get History : {}", id);
        History history = historyRepository.findOne(id);
        return historyMapper.toDto(history);
    }

    /**
     * Delete the history by id.
     *
     * @param id the id of the entity
     */
    @Override
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public void delete(Long id) {
        log.debug("Request to delete History : {}", id);
        historyRepository.delete(id);
    }
}
