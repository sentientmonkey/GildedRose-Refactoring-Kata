package com.gildedrose

import org.junit.Assert.assertEquals
import org.junit.Test

class GildedRoseTest {

    private fun buildRose(vararg items: Item): GildedRose {
        @Suppress("UNCHECKED_CAST")
        return GildedRose(items as Array<Item>)
    }

    private fun assertDifference(difference: Int, state: () -> Int, action: () -> Unit) {
        val before = state()
        action()
        val after = state()
        assertEquals(difference, after - before)
    }

    @Test
    fun `items reduce in quality each day`() {
        val rose = buildRose(Item("nachos", 30, 10))

        assertDifference(-1, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Once the sell by date has passed, quality degrades twice as fast`() {
        val rose = buildRose(Item("nachos", 0, 10))

        assertDifference(-2, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Aged Brie increases in quality`() {
        val rose = buildRose(Item("Aged Brie", 30, 10))

        assertDifference(1, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Aged Brie increases in quality twice as fast after expiration`() {
        val rose = buildRose(Item("Aged Brie", 0, 10))

        assertDifference(2, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Item quality never goes above 50`() {
        val rose = buildRose(Item("Aged Brie", 0, 50))

        assertDifference(0, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Item quality never degrades below 0`() {
        val rose = buildRose(Item("nachos", 0, 0))

        assertDifference(0, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Item SellIn reduces by 1 each day`() {
        val rose = buildRose(Item("nachos", 1, 1))

        assertDifference(-1, { rose.items[0].sellIn }, { rose.updateQuality() })
    }

    @Test
    fun `Sulfuras never reduces in quality`() {
        val rose = buildRose(Item("Sulfuras, Hand of Ragnaros", 30, 10))

        assertDifference(0, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Backstage passes increase in quality`() {
        val rose = buildRose(Item("Backstage passes to a TAFKAL80ETC concert", 11, 10))

        assertDifference(1, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Backstage passes increase by two in quality 10 days before`() {
        val rose = buildRose(Item("Backstage passes to a TAFKAL80ETC concert", 10, 10))

        assertDifference(2, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Backstage passes increase by tree in quality 5 days before`() {
        val rose = buildRose(Item("Backstage passes to a TAFKAL80ETC concert", 5, 10))

        assertDifference(3, { rose.items[0].quality }, { rose.updateQuality() })
    }

    @Test
    fun `Backstage passes quality goes to zero after concert`() {
        val rose = buildRose(Item("Backstage passes to a TAFKAL80ETC concert", 0, 10))

        rose.updateQuality()
        assertEquals(0, rose.items[0].quality)
    }
}


