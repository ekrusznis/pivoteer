package com.my.pivoteer.api.help.repository

import com.my.pivoteer.api.help.model.HelpTopic
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface HelpTopicRepository : JpaRepository<HelpTopic, UUID>
