package com.liu233w.acm_statistics.backend.web.rest;

import com.liu233w.acm_statistics.backend.AcmStatisticsJhipsterApp;

import com.liu233w.acm_statistics.backend.domain.CrawlerUsernameSet;
import com.liu233w.acm_statistics.backend.repository.CrawlerUsernameSetRepository;
import com.liu233w.acm_statistics.backend.service.CrawlerUsernameSetService;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerUsernameSetDTO;
import com.liu233w.acm_statistics.backend.service.mapper.CrawlerUsernameSetMapper;
import com.liu233w.acm_statistics.backend.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.liu233w.acm_statistics.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CrawlerUsernameSetResource REST controller.
 *
 * @see CrawlerUsernameSetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AcmStatisticsJhipsterApp.class)
public class CrawlerUsernameSetResourceIntTest {

    private static final String DEFAULT_USERNAMES = "AAAAAAAAAA";
    private static final String UPDATED_USERNAMES = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    @Autowired
    private CrawlerUsernameSetRepository crawlerUsernameSetRepository;

    @Autowired
    private CrawlerUsernameSetMapper crawlerUsernameSetMapper;

    @Autowired
    private CrawlerUsernameSetService crawlerUsernameSetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCrawlerUsernameSetMockMvc;

    private CrawlerUsernameSet crawlerUsernameSet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CrawlerUsernameSetResource crawlerUsernameSetResource = new CrawlerUsernameSetResource(crawlerUsernameSetService);
        this.restCrawlerUsernameSetMockMvc = MockMvcBuilders.standaloneSetup(crawlerUsernameSetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrawlerUsernameSet createEntity(EntityManager em) {
        CrawlerUsernameSet crawlerUsernameSet = new CrawlerUsernameSet()
            .usernames(DEFAULT_USERNAMES)
            .title(DEFAULT_TITLE)
            .userId(DEFAULT_USER_ID);
        return crawlerUsernameSet;
    }

    @Before
    public void initTest() {
        crawlerUsernameSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createCrawlerUsernameSet() throws Exception {
        int databaseSizeBeforeCreate = crawlerUsernameSetRepository.findAll().size();

        // Create the CrawlerUsernameSet
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);
        restCrawlerUsernameSetMockMvc.perform(post("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isCreated());

        // Validate the CrawlerUsernameSet in the database
        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeCreate + 1);
        CrawlerUsernameSet testCrawlerUsernameSet = crawlerUsernameSetList.get(crawlerUsernameSetList.size() - 1);
        assertThat(testCrawlerUsernameSet.getUsernames()).isEqualTo(DEFAULT_USERNAMES);
        assertThat(testCrawlerUsernameSet.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCrawlerUsernameSet.getUserId()).isEqualTo(DEFAULT_USER_ID);
    }

    @Test
    @Transactional
    public void createCrawlerUsernameSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crawlerUsernameSetRepository.findAll().size();

        // Create the CrawlerUsernameSet with an existing ID
        crawlerUsernameSet.setId(1L);
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrawlerUsernameSetMockMvc.perform(post("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CrawlerUsernameSet in the database
        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUsernamesIsRequired() throws Exception {
        int databaseSizeBeforeTest = crawlerUsernameSetRepository.findAll().size();
        // set the field null
        crawlerUsernameSet.setUsernames(null);

        // Create the CrawlerUsernameSet, which fails.
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);

        restCrawlerUsernameSetMockMvc.perform(post("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isBadRequest());

        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = crawlerUsernameSetRepository.findAll().size();
        // set the field null
        crawlerUsernameSet.setTitle(null);

        // Create the CrawlerUsernameSet, which fails.
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);

        restCrawlerUsernameSetMockMvc.perform(post("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isBadRequest());

        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = crawlerUsernameSetRepository.findAll().size();
        // set the field null
        crawlerUsernameSet.setUserId(null);

        // Create the CrawlerUsernameSet, which fails.
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);

        restCrawlerUsernameSetMockMvc.perform(post("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isBadRequest());

        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrawlerUsernameSets() throws Exception {
        // Initialize the database
        crawlerUsernameSetRepository.saveAndFlush(crawlerUsernameSet);

        // Get all the crawlerUsernameSetList
        restCrawlerUsernameSetMockMvc.perform(get("/api/crawler-username-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crawlerUsernameSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].usernames").value(hasItem(DEFAULT_USERNAMES.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }

    @Test
    @Transactional
    public void getCrawlerUsernameSet() throws Exception {
        // Initialize the database
        crawlerUsernameSetRepository.saveAndFlush(crawlerUsernameSet);

        // Get the crawlerUsernameSet
        restCrawlerUsernameSetMockMvc.perform(get("/api/crawler-username-sets/{id}", crawlerUsernameSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(crawlerUsernameSet.getId().intValue()))
            .andExpect(jsonPath("$.usernames").value(DEFAULT_USERNAMES.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCrawlerUsernameSet() throws Exception {
        // Get the crawlerUsernameSet
        restCrawlerUsernameSetMockMvc.perform(get("/api/crawler-username-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCrawlerUsernameSet() throws Exception {
        // Initialize the database
        crawlerUsernameSetRepository.saveAndFlush(crawlerUsernameSet);
        int databaseSizeBeforeUpdate = crawlerUsernameSetRepository.findAll().size();

        // Update the crawlerUsernameSet
        CrawlerUsernameSet updatedCrawlerUsernameSet = crawlerUsernameSetRepository.findOne(crawlerUsernameSet.getId());
        // Disconnect from session so that the updates on updatedCrawlerUsernameSet are not directly saved in db
        em.detach(updatedCrawlerUsernameSet);
        updatedCrawlerUsernameSet
            .usernames(UPDATED_USERNAMES)
            .title(UPDATED_TITLE)
            .userId(UPDATED_USER_ID);
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(updatedCrawlerUsernameSet);

        restCrawlerUsernameSetMockMvc.perform(put("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isOk());

        // Validate the CrawlerUsernameSet in the database
        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeUpdate);
        CrawlerUsernameSet testCrawlerUsernameSet = crawlerUsernameSetList.get(crawlerUsernameSetList.size() - 1);
        assertThat(testCrawlerUsernameSet.getUsernames()).isEqualTo(UPDATED_USERNAMES);
        assertThat(testCrawlerUsernameSet.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCrawlerUsernameSet.getUserId()).isEqualTo(UPDATED_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCrawlerUsernameSet() throws Exception {
        int databaseSizeBeforeUpdate = crawlerUsernameSetRepository.findAll().size();

        // Create the CrawlerUsernameSet
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetMapper.toDto(crawlerUsernameSet);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCrawlerUsernameSetMockMvc.perform(put("/api/crawler-username-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crawlerUsernameSetDTO)))
            .andExpect(status().isCreated());

        // Validate the CrawlerUsernameSet in the database
        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCrawlerUsernameSet() throws Exception {
        // Initialize the database
        crawlerUsernameSetRepository.saveAndFlush(crawlerUsernameSet);
        int databaseSizeBeforeDelete = crawlerUsernameSetRepository.findAll().size();

        // Get the crawlerUsernameSet
        restCrawlerUsernameSetMockMvc.perform(delete("/api/crawler-username-sets/{id}", crawlerUsernameSet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CrawlerUsernameSet> crawlerUsernameSetList = crawlerUsernameSetRepository.findAll();
        assertThat(crawlerUsernameSetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrawlerUsernameSet.class);
        CrawlerUsernameSet crawlerUsernameSet1 = new CrawlerUsernameSet();
        crawlerUsernameSet1.setId(1L);
        CrawlerUsernameSet crawlerUsernameSet2 = new CrawlerUsernameSet();
        crawlerUsernameSet2.setId(crawlerUsernameSet1.getId());
        assertThat(crawlerUsernameSet1).isEqualTo(crawlerUsernameSet2);
        crawlerUsernameSet2.setId(2L);
        assertThat(crawlerUsernameSet1).isNotEqualTo(crawlerUsernameSet2);
        crawlerUsernameSet1.setId(null);
        assertThat(crawlerUsernameSet1).isNotEqualTo(crawlerUsernameSet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrawlerUsernameSetDTO.class);
        CrawlerUsernameSetDTO crawlerUsernameSetDTO1 = new CrawlerUsernameSetDTO();
        crawlerUsernameSetDTO1.setId(1L);
        CrawlerUsernameSetDTO crawlerUsernameSetDTO2 = new CrawlerUsernameSetDTO();
        assertThat(crawlerUsernameSetDTO1).isNotEqualTo(crawlerUsernameSetDTO2);
        crawlerUsernameSetDTO2.setId(crawlerUsernameSetDTO1.getId());
        assertThat(crawlerUsernameSetDTO1).isEqualTo(crawlerUsernameSetDTO2);
        crawlerUsernameSetDTO2.setId(2L);
        assertThat(crawlerUsernameSetDTO1).isNotEqualTo(crawlerUsernameSetDTO2);
        crawlerUsernameSetDTO1.setId(null);
        assertThat(crawlerUsernameSetDTO1).isNotEqualTo(crawlerUsernameSetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(crawlerUsernameSetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(crawlerUsernameSetMapper.fromId(null)).isNull();
    }
}
