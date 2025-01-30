package com.my.pivoteer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PivoteerApplication

fun main(args: Array<String>) {
	runApplication<PivoteerApplication>(*args)
}
