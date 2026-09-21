# Earth — PRD, short edition

| | |
|---|---|
| **For** | Engineering and design |
| **Date** | 21 September 2026 |
| **Reads in** | 15 minutes. The full PRD (v3) is the reference for every rule, state and screen. Section numbers in brackets point into it. |

## 1. What we are building

Earth is a marketplace for anything that grows from the earth, is locked under it, or feeds from it. The founder's rules: Earth is only the platform, never the escrow. It earns a percentage on store payments and a margin on delivery. The buyer chooses the delivery company, and only companies with an API can be plugged in. He also wants a waitlist now and a progress update every day.

There are two ways of buying, so there are two lanes on one account.

| | Stores lane | Bulk lane |
|---|---|---|
| Example | Tomatoes, rice, eggs, a goat | 50 tonnes of cocoa, tin ore, later gold |
| Buying | Cart, choose delivery, pay online | Enquire, negotiate in chat, agree, exchange documents |
| Payment | Online, divided at source by the payment company | Bank to bank between the parties. Earth never sees it. |
| Earth earns | Commission plus delivery margin | Subscription and licence-check fee (proposal) |

## 2. Phases

| Phase | What ships | Rough time |
|---|---|---|
| **P0** Waitlist | Waitlist with referral places, staff export and invite, founder view | 2 weeks |
| **P1** Stores, one city | Everything in section 3 | About 5 months with 2 frontend and 2 backend engineers. About 8 with one of each. |
| **P2** Verified profiles | Licence checks, verified exporter and mine-owner profiles, screened buyer requests, document sharing | 6 weeks |
| **P3** Bulk lane | Listings, enquiries, quotations, bulk offers, agreement records, freight quotes | 3 months, **only after a lawyer's opinion** |
| **P4** | More cities, sellers abroad, dollar payments, gold listings | Later |

Why one city: we found no truck or refrigerated delivery API in Nigeria. Parcel couriers work inside a city. Fresh food from a faraway farm would spoil.

## 3. Phase 1 scope

**In:** sign-up by one-time code · seller set-up in six steps · identity and business verification with an admin queue · products · search · one cart per store · checkout with live delivery quotes · split payment in naira · orders with live tracking · one chat per buyer and store, with product cards and price offers · refunds, disputes, returns · notifications, with WhatsApp as the dependable channel · admin console · installable web app.

**Out of P1:** paying once for several stores · delivery between cities · dollar prices · bulk listings · document requests · buying organisations · recurring orders · replacements · native apps.

**Can be cut if time is short** [17.4]: change-of-mind returns, ratings, price offers, voice notes, the third language, business verification, collect-it-myself.

## 4. The story

**Monday, Ikorodu.** Bola's farm has tomatoes ripening and a middleman offering a third of the city price. She opens Earth from a WhatsApp link, enters her number and a code, picks what she sells from pictures, names her store, and types her street and a landmark. She photographs a basket. The form suggests "basket, about 20 kg". Two things stand between her and customers. She proves who she is with her identity number and a selfie. The first try fails in the dim shed, the second works, and a badge appears: *Identity verified*. She enters her own bank account, and the name the bank holds matches. Her tomatoes are live. It took about fifteen minutes and she called nobody.

**Tuesday, Yaba.** Ngozi runs a restaurant and loses a morning at the market twice a week. She searches tomatoes, filters to "delivers to me", and messages Bola. The reply lands while she is still typing. Bola taps **+**, then "Make an offer": three baskets at 8,500 each, valid 24 hours. It arrives as a card, not a sentence. Ngozi accepts, and the card turns green on both phones within a second.

Checkout shows delivery options as they arrive: a car this afternoon at 4,500, or a van this evening at 5,200. She pays 30,000. The payment company divides it there and then. Nobody at Earth held her money.

Bola's phone chimes with a paid order, and she has an hour of opening time to accept. She packs and marks it ready at two, and a rider is booked at that moment. Ngozi watches the status change by itself. At the door she reads a four-digit code to the rider. One basket is bruised, so she reports it with a photo and asks for 4,000 back. Bola agrees in the app, and the refund is on its way. The next Tuesday, Ngozi taps "Buy again".

The Bulk lane story (a verified gold mine owner, and a cocoa buyer in Houston) is in the full PRD [16.1].

## 5. User stories, phase 1

Acceptance criteria for every story are in the full PRD [16.2]. A story is done when those criteria pass.

**Waitlist (P0)**
- **US-A1.** As a visitor I join in under a minute with one contact and a code.
- **US-A2.** As someone waiting I see my place in my city and move up 5 places for each friend who confirms.
- **US-A3.** As staff I filter sign-ups by segment and invite them in batches.
- **US-A4.** As the founder I see waitlist growth every day.

**Accounts**
- **US-B1.** As a user I sign up with a phone or email and a six-digit code. No password needed.
- **US-B2.** As a seller my payout account cannot be changed with a stolen SIM: it needs a second proof and a 48-hour hold.
- **US-B3.** As a user I choose buying, selling or both, and switch between them.
- **US-B4.** As an owner I invite staff who can work orders and chat without seeing my money.

**Seller set-up and verification**
- **US-C1.** As a seller I set up step by step and can leave and come back.
- **US-C2.** As a seller my identity check is automatic, within 2 minutes.
- **US-C3.** As a seller I cannot go live without a payout account in my verified name.
- **US-C4.** As a farmer with no registered business, my limit grows with my track record.
- **US-C5.** As a seller asked for changes, I am told exactly what was wrong.
- **US-C6.** As Operations I decide a verification case from one screen, with a reason.

**Products and search**
- **US-D1.** As a farm seller I list a product from my phone in under three minutes.
- **US-D2.** As a seller I change price and stock instantly, and two buyers can never both buy the last unit.
- **US-D3.** As a buyer I find food that can reach me, even if I misspell it.
- **US-D4.** As a buyer my shared link shows a proper preview on WhatsApp.
- **US-D5.** As a buyer I save stores and buy again in two taps.

**Checkout and delivery**
- **US-E1.** As a buyer I choose my delivery company from live prices.
- **US-E2.** As a buyer the price I saw is the price I pay.
- **US-E3.** As a buyer my order exists even if I close the page after paying.
- **US-E4.** As a seller I know the instant I have a paid order.
- **US-E5.** As a seller delivery is booked when I say the goods are ready.
- **US-E6.** As a buyer I follow my delivery live, and I can say so if it never comes.
- **US-E7.** As a buyer I can collect an order myself with a code.

**Money**
- **US-F1.** As a seller my share goes straight to my own bank account, and every order shows the breakdown.
- **US-F2.** As Earth, commission and the delivery charge are taken at source.
- **US-F3.** As a new seller I can take orders up to a limit on money at risk.
- **US-F4.** As a buyer I get refunds automatically when the rules say I am owed one.
- **US-F5.** As a seller I see any debt I owe Earth and how it is being repaid.
- **US-F6.** As Operations every payment reversal raises an alarm with the evidence ready.
- **US-F7.** As Finance I reconcile daily against the payment company, to the kobo.

**Conversations**
- **US-G1.** As a buyer I have one chat with each store, like WhatsApp, with my orders inside it as cards.
- **US-G2.** As a user on a bad connection my messages send when the connection returns, once and in order.
- **US-G3.** As a user every chat action has a button. Typed shortcuts are optional.
- **US-G4.** As a seller I drop one of my products into the chat as a card.
- **US-G5.** As either side I make a price offer as a card. One open offer per product.
- **US-G6.** As a buyer an accepted offer becomes my checkout at that price.
- **US-G7.** As a user I mention a colleague with `@`. Mentioning never grants access.
- **US-G9.** As a user I know exactly who can read my messages.

**Disputes and safety**
- **US-J1.** As a buyer I report a problem with photos inside the window, even after tapping Confirm.
- **US-J2.** As a seller I answer a dispute: agree, offer a different amount, or disagree.
- **US-J3.** As Operations I decide a dispute from one screen.
- **US-J5.** As Operations banned people cannot come back under a new name.

## 6. The rules that are easy to get wrong

1. **Payment is confirmed on the server only.** The payment company's message is a hint. Earth re-reads the payment by API before moving the order, and processes it once however many times it is sent [12.1].
2. **One store, one order, one payment.** A buyer with three stores checks out three times. This keeps the split, the fee and refunds unambiguous [9.2].
3. **The split is fixed amounts, calculated by our server.** Seller receives goods, minus commission, minus tax on the commission, minus the payment fee on the goods. Earth receives the rest. Stored as a ledger and never recalculated [9.2].
4. **Earth is still the merchant.** If a payment is refunded or reversed after the seller was paid, the payment company takes it from Earth. So we need a seller debt ledger, a refund reserve, and seller limits [9.4, 9.5, 9.9].
5. **Seller limits are on money at risk, not monthly sales.** 100,000 naira for a new seller, 500,000 after 10 good orders from at least 5 buyers, 3,000,000 after 50. Reserved when a payment starts [9.5].
6. **Accept timers count opening hours only.** 4 opening hours, or 1 for fresh goods. An order at 1 am punishes nobody [12.1].
7. **Delivery is booked when the seller marks Ready, not at payment.** The buyer's delivery price is fixed at payment. Earth absorbs a carrier increase up to its own margin, otherwise the buyer gets 30 minutes to decide [8.3].
8. **Stores chat is one thread per buyer and store.** Every store member sees it. Read status is per person, shown per side [10.1].
9. **Offers are versioned cards.** Accept, withdraw and replace are compare-and-set on the version. The server decides a tie. Never sent or accepted offline [10.3].
10. **The server numbers every message.** That number is the order everyone sees. Clients dedupe by it, and reconnect by asking for everything after the last number they hold [10.6].
11. **Removing someone takes effect in 5 seconds**, including open connections and queued messages [15.4].
12. **Staff see prices and offer values, never totals, payouts or revenue**, on any screen or in any server response [4.3].

The full order state table, with every guard and timer, is in [12.1]. The refund table that says who bears what is in [9.9].

## 7. For design

**Draw in this order**, because it is the order of the build: waitlist (7 small screens) · sign-up and seller set-up · add a product, store page, product page · conversation with product card and offer card · cart, checkout and delivery options · order detail with live tracking · dispute · verification centre · admin queues.

**Phase 1 is about 50 screens.** The numbered list, with the section that specifies each one, is in the full PRD [13]. Open only the rows you are drawing.

**Four rules cover most states** [14]:

1. Never a blank page or a lone spinner. Show the page's skeleton, then fill it in place.
2. Every empty screen says what will appear there and gives the one action that fills it.
3. Every error says what to do next, in plain words, and never loses what the user typed.
4. Offline: what has loaded stays readable. Actions that can wait are queued with a clock. Pay and offers are disabled, with the reason.

The screens where states matter most have their own tables: checkout, payment result, order detail, conversation, offer card [14.2].

**The reference user** is a farmer on a low-cost Android phone with weak data. So: pictures and presets instead of typing, one question per screen, no map needed for an address, every chat action has a button, and status is never shown by colour alone.

**Already decided, so do not redesign:** the visual identity of the live site (warm paper and ink, serif headings, large photography, no green).

## 8. Technical direction

| Surface | Address | Built with |
|---|---|---|
| Website and public pages: home, search, store, product | `earth…/` | The existing Vite and React codebase, server-rendered |
| The application | `earth…/app` | Vite, React, TypeScript single-page app. Redux Toolkit with RTK Query. Installable. |
| Admin console | `admin.earth…` | Same stack, separate build, its own sign-in |

Two adjustments to what was asked, with reasons:

- **Do not rebuild the public site in Next.js.** It is already live on Vite and React.
- **Public store and product pages must be server-rendered.** WhatsApp reads a link once without running code. A plain single-page app gives it an empty page and no preview, and most sharing here happens on WhatsApp.

Live updates: one connection per signed-in user, carrying every event. RTK Query's streaming updates only patch data a screen has already loaded. Reconnection, ordering and replay come from the message numbers in rule 10.

**"Real time" as numbers**, measured inside our systems at the 95th percentile: message in to published, under 150 ms. Offer actions, under 300 ms. Paid order on the seller's screen, under 2 s. Search may lag 60 s. Dashboards may lag 5 minutes.

**"Scalable" as rules:** no user state in app servers. Live connections on their own tier with a message bus. Data grouped by conversation and by seller organisation, with no transaction across groups. Outbox for every notifying change. Idempotency keys on every create. Launch sizing is 5,000 users and 500 connections, load-tested at five times that [15.3].

## 9. What engineering must confirm before building on it

Nothing may be built on these until someone has checked [20.2].

| # | Question | How |
|---|---|---|
| U3 | When a split payment is refunded after the seller was paid, is it taken from Earth's balance? | In writing from the payment company. **Blocks the start of P1.** |
| U1 | Can the payment company hold a seller's share until the problem window closes? | Test system, and in writing |
| U14 | Can one payment be divided among several sellers in fixed amounts? | Test system |
| U18 | Can Earth keep a standing balance to fund refunds? | In writing |
| U17 | Can the delivery aggregators enforce a delivery code or return a proof photo? | Test system |
| U16 | How fast do the aggregators return quotes? | Measure it |
| U5 | What weight will couriers carry, and do they take fresh produce? | In writing |
| U4 | May we resell delivery at a marked-up price? | In writing |

Recommended providers: Paystack first, Flutterwave as fallback. Shipbubble first, Terminal Africa second, both behind one internal interface.

## 10. Waiting on the founder

- **The word "exchange".** The 2025 securities law reserves "commodity exchange" for registered companies, with a penalty from 10 million naira. The site says it 24 times. We recommend "marketplace".
- **Commission:** we recommend 7.5%, which earns Earth about 860 naira on an 11,500 naira order. Delivery margin 10%.
- **Launch city:** we recommend Lagos.
- **A lawyer in week 1**, because the Bulk lane may fall under the same securities law whatever it is called.
- **Company name, email and phone**, needed to open the payment and delivery accounts.

The full list is in the Founder brief.
