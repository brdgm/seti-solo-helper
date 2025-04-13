import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('SETI Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Setup Automa' }).click()
  await page.getByLabel('Automa').selectOption('usa')
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few rounds
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByTestId('doneButton').click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByTestId('doneButton').click()

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('SETI Solo Helper')
})
