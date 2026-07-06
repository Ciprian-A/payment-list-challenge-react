import {expect, test} from '@playwright/test'

test('loads first page of payments', async ({page}) => {
	await page.goto('/')

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows).toHaveCount(5)

	await expect(page.getByTestId('page-label')).toHaveText('Page 1')
	await expect(page.getByTestId('prev-page')).toBeDisabled()
	await expect(page.getByTestId('next-page')).toBeEnabled()
})

test('filters by payment ID', async ({page}) => {
	await page.goto('/')

	await page.getByTestId('search-input').fill('pay_134_1')
	await page.getByTestId('search-button').click()

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows).toHaveCount(1)

	await expect(rows.first()).toContainText('pay_134_1')
	await expect(page.getByTestId('page-label')).toHaveText('Page 1')
})

test('filters by currency', async ({page}) => {
	await page.goto('/')

	await page.getByTestId('currency-select').selectOption('USD')
	await page.getByTestId('search-button').click()

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows).toHaveCount(5)

	await expect(rows.first()).toContainText('USD')
	await expect(page.getByTestId('page-label')).toHaveText('Page 1')
})

test('filters by payment ID + currency', async ({page}) => {
	await page.goto('/')

	await page.getByTestId('search-input').fill('pay_134_1')
	await page.getByTestId('currency-select').selectOption('USD')
	await page.getByTestId('search-button').click()

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows).toHaveCount(1)

	await expect(rows.first()).toContainText('pay_134_1')
	await expect(rows.first()).toContainText('USD')

	await expect(page.getByTestId('page-label')).toHaveText('Page 1')
})

test('clear filters resets search + currency + page', async ({page}) => {
	await page.goto('/')

	await page.getByTestId('search-input').fill('pay_134_1')
	await page.getByTestId('currency-select').selectOption('USD')
	await page.getByTestId('search-button').click()

	const filteredRows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(filteredRows).toHaveCount(1)

	await page.getByTestId('clear-filters-button').click()

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows).toHaveCount(5)

	await expect(page.getByTestId('page-label')).toHaveText('Page 1')

	await expect(page.getByTestId('search-input')).toHaveValue('')
	await expect(page.getByTestId('currency-select')).toHaveValue('')
})

test('pagination next/previous works', async ({page}) => {
	await page.goto('/')

	await page.getByTestId('next-page').click()
	await expect(page.getByTestId('page-label')).toHaveText('Page 2')

	const rowsPage2 = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rowsPage2).toHaveCount(5)

	await page.getByTestId('prev-page').click()
	await expect(page.getByTestId('page-label')).toHaveText('Page 1')

	const rowsPage1 = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rowsPage1).toHaveCount(5)
})

test('next button disabled on last page', async ({page}) => {
	await page.goto('/')

	while (await page.getByTestId('next-page').isEnabled()) {
		await page.getByTestId('next-page').click()
	}

	await expect(page.getByTestId('next-page')).toBeDisabled()

	const pageLabel = await page.getByTestId('page-label').innerText()
	expect(pageLabel).toMatch(/Page \d+/)

	const rows = page.getByTestId('payments-table').locator('tbody tr')
	await expect(rows.count()).resolves.toBeGreaterThan(0)
})
