# Earth — Product Requirements Document

| | |
|---|---|
| **Product** | Earth: a platform to list, find and buy anything that grows from the earth, is locked under it, or feeds from it |
| **Version** | 3.0 (draft for founder approval, after three rounds of internal design, engineering and business review) |
| **Date** | 19 September 2026 |
| **Audience** | Founder, engineering (frontend and backend), UI/UX design, product |
| **Status** | Awaiting the decisions in section 19. Nothing in the application is built yet. The public website and pitch deck are live. |

**Who should read what.**

- **Founder:** the Founder brief below, then section 19. That is everything that needs you. The rest is there if you want the reasoning.
- **Design:** sections 4 to 14. Every journey, rule, state and screen, so nothing has to be assumed.
- **Backend and frontend:** sections 4 to 12, 15 and 16.
- **Everyone:** section 17 (phases, team, risks) and section 20 (sources, and the list of things nobody has confirmed yet).

**Must** means a requirement. **Recommend** means our advice, which the founder can overrule. Anything not yet confirmed carries a tag like **[U3]** that points to the open-questions table in section 20.2. Decisions waiting on the founder carry a tag like **[D4]** that points to section 19. Numbers marked *working guess* are ours and have no data behind them yet.

---

## Founder brief

**What we will build first.** A marketplace for food and farm goods in **one city**. A buyer orders from a verified seller's store, chooses a delivery company from live prices, pays online, and watches the delivery arrive.

**Your rule is kept.** Earth does not become the escrow and takes a percentage. To keep it, we use a licensed payment company that divides each payment at the moment it is made. The seller's share goes to the seller's own bank account. Earth's percentage and the delivery charge go to Earth. Customers' money is never in an account Earth controls.

**When.** These run from the day you answer the decisions below, and they are honest estimates for a small team, not promises.

| | |
|---|---|
| The waitlist you asked for | about 2 weeks |
| First real order | about month 5 to 6 |
| A gold mine owner's verified profile | about month 7 |
| Exporters and foreign buyers negotiating inside Earth | around the end of the first year, after the lawyer's opinion |

**What Earth earns on one order.** A 10,000 naira basket plus 1,500 naira delivery, at the 7.5% commission we recommend:

| | Naira |
|---|---|
| The seller receives (10,000 less the three lines marked *) | 8,944 |
| * Earth's commission, 7.5% of the goods | 750 |
| * Tax on that commission, passed to the tax authority | 56 |
| * Payment company's fee on the goods, borne by the seller if you approve D8 | 250 |
| The delivery company is paid | 1,364 |
| Earth's margin on the delivery | 136 |
| **Total the buyer pays** | **11,500** |

And Earth's side of it:

| | Naira |
|---|---|
| Earth's commission plus its delivery margin | 886 |
| Less the payment company's fee on the delivery part, which Earth bears | −23 |
| **Earth keeps, before its own tax and running costs** | **about 860** |

**Be clear-eyed about this number.** At 1,000 orders a month, Earth earns about 860,000 naira a month. That does not pay for the team. Break-even is several thousand orders a month. The first year is investment, and Earth pays its own way through more cities, bigger orders and the bulk side.

**Your gold mine question: yes, at about month 7.** A mine owner joins, we check his mining title with the mining office, and he carries a public "Verified mineral seller" profile. It shows no stock, no price and not where his mine is. Buyers we have verified send him requests. We screen each one, he accepts the ones he likes, and the two verified parties talk. **Open public listings of gold come last.** Gold is among the most forged goods in this region, and one fake listing would damage every honest seller on Earth. With profiles and requests there is no listing to fake.

**Three things you should know before you approve.**

1. **Your no-escrow rule leaves one risk.** The payment is made to Earth's account with the payment company, so if a buyer's bank reverses a payment after the seller has been paid, the payment company takes the money from Earth. One lost reversal wipes out the earnings of about 13 good orders. We contain it with limits on every seller, proof of delivery, rules on foreign cards, and, if you agree, paying sellers a day or two after delivery instead of the next morning. We will sound an alarm at 100,000 naira of losses in a month, or 1% of sales once sales are larger. **That is an alarm, not a ceiling.** Reversals arrive weeks late, so losses can pass it before we see them.
2. **Fresh food from a faraway farm cannot launch first.** The delivery companies that connect by computer carry parcels inside a city. We found nobody in Nigeria offering refrigerated or truck delivery that way. Tomatoes from Kaduna to Lagos would spoil, and we would pay for it. So we start with farms and sellers in and around one city.
3. **The word "exchange" is a legal risk.** The 2025 securities law reserves "commodity exchange", and anything resembling it, for companies registered with the Securities and Exchange Commission, with a penalty from 10 million naira. The website says "a global exchange" today. We recommend "marketplace" in public. You used the word in its ordinary meaning, and nothing about the vision changes. Separately, the bulk side of Earth needs a lawyer's opinion before we build it, because the same law may cover how it works, whatever it is called.

**What we need from you this week** is in the first table of decisions: one question, nine yes-or-number answers, and your company details.

**What we do not know yet:** the build and running budget, and the final team. The full document lists the roles and what drives cost, so that you and the engineering lead can put numbers against them.

---

## 1. Summary

Earth is a platform. It does not own farms, mines, trucks or money. It gives sellers a place to show what they have, gives buyers a place to find it, lets them talk and agree in one conversation, lets the buyer choose a delivery company, and takes a percentage when a payment is made.

### 1.1 What the founder said

**Voice note 1 (7 September 2026).** Transcribed by machine from a noisy line. About a minute in the middle and the last minute were inaudible.

> "Think of what the Lord said to Abraham. What are the blessings upon Abraham? … Cattle, silver, gold, all of those things, beyond precious stones … beyond just what grows under the ground. There is what is locked under the ground."
>
> "We'll call it Earth. [Anything] that grows from the earth, anything that is locked under the earth, and anything that feeds from the earth, we transact it."
>
> "If I have a gold mine, can I come here? I should be able to."
>
> "So what we want now is an exchange of commodities, valuables, foods, all of those things."
>
> "Somebody in the United States should be able to use this as much as somebody that is here. It's very important."

He also said the old interface was all green and he could not read it.

**Voice note 2 (19 September 2026).** Several speakers, and parts are inaudible. This is our reading of it, and it should be corrected if we misheard.

1. Earth only offers "the service of the platform". It should not "become the escrow" for transactions, because that needs "a lot of staffing to run that structure".
2. "When you pay, you confirm, we just get a percentage", from the stores. **We are not sure whether "you confirm" means the payment is confirmed, or the buyer confirms receiving the goods. It matters. See question [Q1] in section 19.**
3. Earth does not run logistics. It makes logistics companies available, "bike or car, whatever it is", and the customer chooses the convenient one. Only companies that allow "back end to back end communication" can be used, and the team has to find them.
4. "We are making money from logistics, we are making money from stores."
5. Next: create the stores, and bring in agro: "shop food, agro food from farms".
6. "Let's create a waitlist", to build anticipation.
7. "Daily updates", so he can see progress.

**Engineering direction (18 September 2026).** Everything real time and built to scale. The application in Vite and React, state in Redux Toolkit. A signature feature: "an interactive chat that you can mention products, services, people, handle documentation all within".

### 1.2 The product in one picture

```
  SELLERS                 ┌──────────────────────── EARTH ────────────────────────┐              BUYERS
  farm, cooperative,      │  STORES lane              BULK lane                   │   household, restaurant,
  market seller, mill, ───┼▶ fixed price, cart,       verified profile, enquiry, ◀┼── processor, exporter,
  mine, ranch             │  checkout                 negotiation, agreement      │   manufacturer, trader
                          │           \                  /                        │
                          │            ONE CONVERSATION (people, products,        │
                          │            offers, delivery, documents)               │
                          │  Verification · Search · Notifications · Admin        │
                          └──────┬───────────────────────┬────────────────────────┘
                                 │                       │
                     PAYMENT COMPANY               LOGISTICS COMPANIES
                     divides each payment          quote, book, track by API.
                     at source. Earth never        Buyer chooses. Earth adds
                     holds customers' money.       a margin.
```

### 1.3 Two lanes, one account

The two voice notes describe two different ways of buying. A basket of tomatoes and a container of cashew cannot share a checkout.

| | **Stores lane** | **Bulk lane** |
|---|---|---|
| Typical item | Tomatoes, yam, rice, eggs, honey, palm oil, animal feed, a goat | 50 tonnes of cocoa, a truck of grain, 500 cattle, tin ore, and later gold |
| Price | Fixed, shown on the page | Negotiated |
| How you buy | Add to cart, choose delivery, pay online | Enquire, negotiate in the conversation, agree, exchange documents |
| Delivery | Buyer picks a delivery company from live prices | Freight quoted for each agreement |
| Payment | Online, divided at source by the payment company | Between the two parties, bank to bank. Earth never sees it. |
| How Earth earns | Percentage of each payment, plus delivery margin. This is the founder's model. | Cannot be a percentage at source. Proposals in section 9.6, for the founder to approve. |
| Verification | Identity, then business | Identity, business, and the licence for that commodity. Buyers are verified too. |

One person with one login can use both lanes, and can be buyer and seller.

---

## 2. Goals, non-goals and success measures

### 2.1 Goals

1. **G1. Anyone with something from the earth can list it.** A market seller with a phone and a licensed mine operator both finish onboarding without calling anybody.
2. **G2. A buyer can trust what they see.** Every seller shows how far they have been verified, in plain words, with dates.
3. **G3. One conversation does the business.** People, products, delivery and documents are handled inside it, live.
4. **G4. Earth earns on every store payment and on delivery, without holding customers' money.**
5. **G5. Usable from anywhere.** What a person outside Nigeria can do grows by phase, and section 17.2 states it honestly for each phase.
6. **G6. The founder sees progress every day.**

### 2.2 Non-goals

Earth will **not**, in any phase described here:

- Hold buyers' or sellers' money, run a wallet, or act as escrow.
- Own, employ or dispatch riders, drivers, trucks or warehouses.
- Buy or sell goods on its own account, or vouch for quality on its own word.
- Match anonymous buy and sell orders, set prices, or execute contracts. The two named parties always negotiate and agree their own contract. This keeps Earth away from the legal definition of a commodity exchange (section 11.4).
- Offer loans, insurance or trade finance. Licensed partners may, later.
- Build native mobile apps before the web application proves the model. The web application must be installable on a phone's home screen.

### 2.3 Success measures

Every target below is a *working guess* to be replaced with real figures after the first 60 days. There is no marketing budget behind the waitlist numbers yet.

| Stage | Measure | Working guess |
|---|---|---|
| Waitlist | Confirmed sign-ups before the stores open, by buyer or seller and by city | 1,000, with at least 150 sellers in the launch city |
| Waitlist | Share of sign-ups that came from a referral link | 20% |
| Activation | Invited sellers who publish a first product within 7 days | 40% |
| Activation | Median time from seller sign-up to first live product | Under 24 hours |
| Stores | Orders per month, 3 months after opening | 1,000. **This does not pay for the team.** See 9.3. |
| Stores | Orders delivered and completed with no dispute | 92% |
| Stores | Losses from reversed payments and unrecovered refunds | Under 1% of payment volume. The alarm in **[D11]** sounds at that level, or at 100,000 naira while volume is small. |
| Conversation | Median seller first reply, within store opening hours | Under 1 hour |
| Revenue | Earth's earnings as a share of payment volume | About 7.5%, from section 9.3 |
| Reliability | Availability and speed | Section 15 |

---

## 3. Principles

1. **Platform first.** Earth does not hold customers' money or carry goods. Where the law or a provider makes Earth the accountable party anyway (it is the merchant on the payment, and the account holder with the logistics company), the document says so openly and limits the exposure.
2. **Trust is shown, never implied.** A badge states what was checked, by whom and when. No badge means not checked.
3. **Progressive, not blocking.** A new seller builds a store in the first ten minutes. Checks gate going live, not getting started.
4. **The phone comes first.** The reference device is a low-cost Android phone on a weak connection.
5. **One conversation.** Anything two parties do together happens in the thread, and the thread is the record.
6. **Real time where a person is waiting.** Messages, offers, order status and tracking are live. Reports and search need not be.
7. **One Earth.** No country versions. Country changes currency, delivery options, payment methods and required documents only.
8. **Plain words, and every action has a button.** Typed shortcuts are a convenience for fast users, never the only way.

---

## 4. Users, things and permissions

### 4.1 Personas

| Persona | Who they are | What they need |
|---|---|---|
| **Bola**, farm seller | Runs a vegetable and poultry farm at Ikorodu, on the edge of Lagos. Low-cost Android phone, patchy data. Sells to middlemen at a poor price. | Open a store in minutes, post produce from her phone, be paid to her own bank account, not be cheated on delivery. |
| **Ngozi**, store buyer | Runs a restaurant in Yaba, Lagos. Buys food twice a week and loses a morning at the market each time. | Farm prices, a delivery time she can plan around, a choice between cheaper and faster, reordering in two taps. |
| **Tunde**, licensed mine operator | Holds a small-scale mining lease in Osun. Burned twice by fake buyers. | Prove he is legitimate once, be found by serious buyers only, keep sensitive details private. |
| **Daniel**, international bulk buyer | Procurement manager for a chocolate maker in Houston. Laptop. Answers to a compliance team. | Verified cocoa exporters, certificates, negotiation with a record, freight, one file for compliance. |
| **Sade**, seller staff | Works for Bola. Packs orders and answers chat. | Act on orders and messages. Must not see bank details, revenue or change prices. |
| **Kemi**, Earth operations | At launch one person wears four hats: verification, listing review, support and disputes, payment reversals. The hats become separate people as volume grows (section 17.3). | Queues, evidence on one screen, clear actions, a record of every decision. |
| **Founder** | Wants to see the business and the build move. | One screen and a daily update. |

Logistics companies are connected by API and have no user accounts until phase 4.

### 4.2 The things Earth keeps track of

Defined once, so design and engineering use the same words.

| Thing | Definition |
|---|---|
| **User** | One person, one login. |
| **Organisation** | A seller's business: an individual trader, a cooperative, a company, a mining title holder. Verification, the payout account, products, orders and conversations belong to the organisation, so they survive staff changes. Buyers are individuals in phases 1 and 2. **Buying organisations** with their own members arrive in phase 3, for companies like Daniel's. |
| **Member** | A user's role inside an organisation: Owner, Manager or Staff (and Viewer for buying organisations, phase 3). |
| **Store** | The public storefront of an organisation. One organisation has exactly one store. A store can have several pickup addresses. |
| **Product** | A fixed-price item in a store (Stores lane). |
| **Bulk listing** | A commodity offered for negotiation (Bulk lane, phase 3). |
| **Cart** | Belongs to a buyer, for one store. A buyer can hold carts at several stores and checks each out separately (section 9.2 explains why). |
| **Payment** | One charge by the payment company, for exactly one order. |
| **Order** | One purchase from one store: items, delivery choice, payment, status. |
| **Delivery** | One booking with one logistics company for one order. |
| **Conversation** | Section 10.1. |
| **Offer** | A structured price proposal inside a conversation. |
| **Document** | A file owned by an organisation, kept in its document store, shared into conversations version by version. |
| **Enquiry** | A buyer's first approach to a bulk seller (section 7.5). |
| **Agreement record** | The shared checklist created when a bulk offer is accepted (section 12.2). One per accepted bulk offer, attached to its conversation. |
| **Freight quote** | A price from a freight partner for one agreement record. |
| **Seller debt** | Money a seller owes Earth after a refund or reversal on their order (section 9.4). |

### 4.3 Roles

| Organisation role | Can do |
|---|---|
| **Owner** | Everything: payout account, verification, members, prices, offers, closing the organisation. Exactly one. Transfer of ownership requires the new owner to pass Identity verification and re-runs the payout name check. |
| **Manager** | Products, prices, stock, orders, offers, conversations, performance. Cannot see or change the payout account. Cannot remove the owner. Can add people to a conversation. |
| **Staff** | See and fulfil orders, answer conversations, update stock. Cannot change prices. Cannot make or accept offers, unless the owner sets them an offer limit (a total value in the store's currency). **What Staff see of money:** product prices, and the values on offer cards in conversations, because they cannot serve a customer without them. **What they never see,** on any screen or in any server response: order totals, commission, payouts, revenue, seller debt or the payout account. Order cards shown to Staff list items and quantities without amounts. |

| Earth staff role | Can do |
|---|---|
| **Operations** | Verification queue, listing review, reports, disputes, reversals. Cannot review an organisation they belong to. Can suspend an account for up to 7 days. |
| **Finance** | Commission rates, limits, logistics margins and wallets, reconciliation, seller debts. |
| **Super admin** | Everything, including staff accounts and longer suspensions. Every action is logged. |
| **Founder** | Read-only access to the Founder view. |

At launch one person may hold Operations and Finance. The roles stay separate in the system so they can be split later.

**Closing an organisation** (Owner only) is refused while it has open orders, open disputes or seller debt. Otherwise the store is unpublished at once, records are kept as the law requires, and the payout account is removed after the last payout.

**Buying organisations** (phase 3) have Owner, Manager and Viewer. Their permissions are specified with the rest of phase 3, after the legal opinion.

### 4.4 Permission matrix

**Y** allowed · **Own** only for their own organisation or data · **—** not allowed · **Lim** up to the offer limit set by the owner. Seller roles describe what a person can do **for the store**. Every person can also buy for themself, with the Buyer column's rights.

| Action | Visitor | Buyer | Seller Staff | Seller Manager | Seller Owner | Operations | Finance | Super admin |
|---|---|---|---|---|---|---|---|---|
| Browse, search, view stores and products | Y | Y | Y | Y | Y | Y | Y | Y |
| Read what a seller's badges mean | Y | Y | Y | Y | Y | Y | Y | Y |
| Add to cart, check out | — | Y | as Buyer | as Buyer | as Buyer | — | — | — |
| Start or reply in a conversation | — | Y | Own | Own | Own | — | — | — |
| Add a colleague to a Bulk conversation (phase 2) | — | — | — | Own | Own | — | — | — |
| Create or edit products and prices | — | — | Stock only | Own | Own | — | — | — |
| Make or accept an offer | — | Y | Lim | Own | Own | — | — | — |
| Accept, decline, pack, mark ready, hand over orders | — | — | Own | Own | Own | — | — | — |
| Answer a buyer's cancellation request; cancel an order the store cannot fulfil | — | — | — | Own | Own | — | — | — |
| Approve a return | — | — | — | Own | Own | — | — | — |
| See order totals, fees, payouts, debt | — | Own orders | — | Own | Own | Dispute and reversal cases | Y | Y |
| Request cancellation of their own paid order | — | Own | as Buyer | as Buyer | as Buyer | — | — | — |
| Open a dispute, request a return | — | Own | as Buyer | as Buyer | as Buyer | — | — | — |
| Respond to a dispute | — | — | — | Own | Own | — | — | — |
| Decide a dispute, approve or issue a refund | — | — | — | — | — | Y | — | Y |
| Submit verification, set payout account | — | — | — | — | Own | — | — | — |
| Decide verification; review buyer requests (phase 2) | — | — | — | — | — | Y | — | Y |
| Invite, remove members, set offer limits | — | — | — | — | Own | — | — | — |
| Report a listing, person or message | — | Y | Y | Y | Y | — | — | — |
| Unpublish a listing, suspend an account | — | — | — | — | — | Y (7 days) | — | Y |
| Categories, unit presets, prohibited-item rules | — | — | — | — | — | Y | — | Y |
| Commission rates, limits, providers, margins | — | — | — | — | — | — | Y | Y |
| View the audit log | — | — | — | — | — | Own actions | Own actions | Y |
| Manage staff accounts | — | — | — | — | — | — | — | Y |
| Open a private conversation or identity document | — | — | — | — | — | Only under 10.7 | — | Only under 10.7 |
| Founder view | — | — | — | — | — | — | Y | Y, and the Founder |

### 4.5 Getting around

- **One application, two modes.** A user who both buys and sells sees a switch at the top: **Buying** and **Selling**. The application opens in the mode last used. A user with no organisation sees only Buying, with "Open a store" in the menu.
- A user who belongs to more than one organisation picks the active one inside Selling mode. The active organisation's name is always visible, and every action is recorded against it.
- Bottom navigation on phones. Buying: Home · Search · Orders · Messages · Account. Selling: Overview · Orders · Products · Messages · More.
- Messages is shared between modes and shows which hat a conversation belongs to.

### 4.6 What each user sees first

| User | First screen | Contents, in order |
|---|---|---|
| **Buyer** | Home | Search. Continue: open carts, orders in delivery with live status, conversations awaiting reply. Buy again. Saved stores. Stores near me. |
| **Seller Owner, Manager** | Store overview | Needs you now: new orders to accept (with time left), unanswered messages, offers awaiting reply, products returned by review, verification steps outstanding, any seller debt. Today and last 7 days: orders, sales, expected payout, Earth's commission. Low stock. Store health: reply time, completion rate, disputes. |
| **Seller Staff** | Orders to fulfil | Orders by status, oldest first, with items, quantities, pickup time and delivery details. Unanswered messages. No totals, payouts or revenue (4.3). |
| **Operations** | Queues | Verification, listing review, reports, disputes, reversals. Each with count, oldest age, and age against its target. |
| **Finance** | Money and providers | Payment volume, commission, delivery margin, refunds, reversals, seller debts outstanding, refund reserve, logistics wallet balances, reconciliation differences. |
| **Super admin** | Queues | Same as Operations, plus a sanctions-review queue, staff accounts and the audit log. |
| **Founder** | Founder view | Before launch: waitlist growth by segment and city. After: sellers, live products, orders, payment volume, Earth's earnings split into commission and delivery margin, losses against the **[D11]** alarm level, delivery success, disputes, queue ages. The latest daily update. |

---

## 5. Phase 0: the waitlist

### 5.1 Purpose

Build anticipation, and learn who is coming. The answers decide which city and which categories open first. They inform the launch decision. They do not block the waitlist itself.

### 5.2 Flow

```
Landing page ─▶ "Join the waitlist" ─▶ Step 1 (required)              ─▶ Step 2 (optional)               ─▶ You're in
   or a friend's                       I want to: buy / sell / both       What do you buy or sell? (pick)      Your place
   referral link                       Country and city                   How much in a typical month?         Your link
                                       Email or WhatsApp number           Business name                        Share
                                       Consent                                                                 What happens next
```

1. Step 1 asks only for intent, place, one contact and consent.
2. The person confirms the contact with a one-time code (rules in 6.1). Until then they have no place and count in no total.
3. **Their place is shown within a segment that always exists: intent plus city**, for example "number 84 among sellers in Lagos". If they complete step 2, the message also names their category.
4. Referral rule, published on the page: **each friend who joins from your link and confirms moves you up 5 places in your segment, up to 10 friends a day.** Credit lands 24 hours after the friend confirms, and is withdrawn if that entry is found to be fake.
5. Follow-up: a welcome at once, then at most one update a week on the channel they gave. Every message has one-tap unsubscribe, which opens a page confirming it.

Place is calculated from one score per person: **their confirmation number within the segment** (1 for the first to confirm, 2 for the second, and so on) **minus 5 for each valid referral**. The lowest score is first. Ties go to whoever confirmed earlier. Recalculated every hour. A person's place moves down only when others in the segment earn referrals, or when one of their own credits is withdrawn, and the page says so.

### 5.3 Rules

- One entry per contact. Email aliases (dots and plus signs) are treated as the same address.
- No referral credit for disposable email domains, internet phone numbers, or entries that never confirm. **The same device or the same network as the referrer is a signal for review, not an automatic refusal**: mobile networks put thousands of people behind one address, and families share phones. Flagged credits are held for a person to check.
- **"You're already on the list" is shown only after the code is entered.** Before that, the screen says the same thing for every contact: "We've sent a code if this contact can receive one." Otherwise anyone could test who is on the list.
- Consent wording is versioned and stored with the time. The page names the company collecting the data, which requires **[D9]**.
- Staff can filter by intent, city, category and volume, export, and invite a segment in batches. An invitation carries the person's answers into onboarding.

### 5.4 Screens and states

Screens: landing section · step 1 · enter code · step 2 · confirmation · referral landing (a friend's link: "Bola invited you to Earth") · unsubscribe confirmation.

| State | What the person sees |
|---|---|
| Submitting | Button shows progress and is disabled. Fields stay filled. |
| Code sent | The neutral message above, a resend option after 60 seconds, a way to correct the contact. |
| Wrong code | "That code isn't right. 4 tries left." After 5 wrong tries the code is cancelled, and they must tap resend themselves. |
| Expired code | Says so, offers resend. |
| Too many requests | "Please try again in 1 hour." |
| Already on the list (after code) | "You're already in. Here is your place and your link." |
| No connection | "You're offline. We've kept your details on this phone. Open this page again when you're connected and tap Send." We do not promise sending in the background, because most phone browsers do not allow it. |
| Server error | Apology, retry, nothing typed is lost. |
| Confirmed | Place, link, WhatsApp share with a preview card, what happens next. |

---

## 6. Registration, onboarding and verification

### 6.1 Signing up and signing in

```
Sign up ─▶ Enter code ─▶ Name, country, city, language ─▶ What brings you here?
                                                           ├─ Buy   ─▶ Buyer home
                                                           ├─ Sell  ─▶ Seller set-up (6.2)
                                                           └─ Both  ─▶ Seller set-up. Buying mode is available from the switch.
```

- Phone number (default in Nigeria) or email (default elsewhere), confirmed by a one-time code. Sign in with Google is offered. A password is optional.
- **One-time code rules.** Six digits. Valid 10 minutes. Five wrong tries cancels it, and the user must request a new one. At most 3 codes an hour and 10 a day per contact, with further limits per device, per network and per phone-number range, and an overall daily spending cap that pauses SMS and raises an alarm. A puzzle check appears when traffic looks automated. The response is identical whether or not the contact has an account.
- **Sensitive actions need more than a code**, because a stolen SIM card must not be enough to take someone's payout account.
  - An Owner signing in on a **new device** needs a second proof and alerts every contact on the account. There is no delay, so an owner whose phone broke is back at work in minutes. The second proof for someone with a low-cost phone is a fresh selfie match through the identity company. A passkey or authenticator app is offered to those who want one.
  - **Changing the payout account** and **transferring ownership** need the second proof, alert every contact, and take effect after a 48-hour hold during which any alerted contact can cancel. Neither can be started within 48 hours of a new-device sign-in.
- A person invited to an organisation opens the invitation link, confirms their own contact, sees who invited them and with what role, and accepts or declines.
- A person arriving from a waitlist invitation finds their answers filled in.

### 6.2 Seller set-up

| Step | What happens | Needed to go live? |
|---|---|---|
| 1. Your business | Name. Type: individual, cooperative or association, registered company, mining title holder. Country, city. | Yes |
| 2. What you sell | Categories, chosen from pictures with labels. | Yes |
| 3. Your store | Store name, short description, photo. **Pickup address**: street and area from lists, a landmark in words, and "Use my current location" (uses the phone's GPS, no map needed). A map for fine adjustment loads only if the seller asks for it. Opening hours, with sensible defaults. "Buyers can collect from me": yes or no. | Yes |
| 4. First product | Guided form (7.1). Can be saved as a draft. | No |
| 5. Prove who you are | Identity verification (6.3). | **Yes** |
| 6. Where you get paid | Bank and account number. The account name is fetched from the bank and must match the verified person. | **Yes.** A buyer cannot pay a seller who has no payout account, because the payment is divided at the moment it is made. |

Progress saves after every step. The store overview shows a checklist of what is left, and each item opens its step.

**Payout account name rule.** At Identity verified, the account must be in the owner's own name. An account in a cooperative's or company's name is accepted once the organisation is Business verified. If the names do not match, the seller sees: "This account is in the name ADE FARMS LTD. Your verified name is BOLA ADEYEMI. Use an account in your name, or verify your business to use this one", with both routes as buttons.

### 6.3 Verification tiers

Each tier says what was checked, by whom, and when. Tiers 1 and 2 are **free**. Charging a farmer to be verified would work against goal G1.

| Tier | Badge | What is checked | Unlocks |
|---|---|---|---|
| **0** | "New seller, not yet verified" | Phone or email | Build a store and draft products. Nothing public. |
| **1** | **Identity verified** | The owner is a real person: national identity number or bank verification number in Nigeria, a government ID elsewhere, with a selfie match, through a licensed identity company. The legal name is screened against sanctions lists. | Products go live. Conversations. Receive orders within the new-seller limit (9.5). |
| **2** | **Business verified** | The organisation exists and the owner is connected to it. **Two routes:** a company registry record and tax number, **or** a cooperative or association registration certificate. Market sellers and farmers without any registration stay at Tier 1, and the new-seller limit lifts for them through track record instead (9.5). | Payout to a business account. Bulk lane participation. |
| **3** | **Licence verified: [commodity]** | The right to deal in one named commodity, for example a mining title or an exporter's certificate. Held **per commodity**, each with its own expiry. Checked with the issuing body where a register exists, otherwise by document review **[U6]**. | "Verified mineral seller" or "Verified exporter" profile (phase 2). Bulk listings in that commodity (phase 3). |
| **4** | **Site inspected** | An independent inspection company visited and reported. Earth does not inspect. | Badge with the inspector's name, date and report (phase 4). |

Buyers need only a confirmed contact to shop in stores. To send a request or a bulk enquiry (phase 2 onward), a buyer must be Identity verified: the same identity and selfie check as a seller's Tier 1, with a government ID for buyers outside Nigeria **[U11]**, and the same failure and manual-review path.

### 6.4 How approval works

Each tier, and each Tier 3 licence, has its own status. They run independently, so a lapsed licence never touches a seller's identity badge.

```
Not started ─▶ Draft ─▶ Submitted ─▶ In review ─▶ Approved ─▶ Expiring soon ─▶ Expired ─▶ (renew) ─▶ Submitted
                  ▲          │            │
                  │          │            ├─▶ Changes requested ─▶ (seller fixes) ─▶ Submitted
                  └─ Withdrawn            └─▶ Rejected ─▶ Appeal (once, within 14 days) ─▶ In review by a different officer
                     (seller took                              └─▶ or reapply after 30 days
                      it back)
```

| Status | What the seller sees and can do | What Earth does |
|---|---|---|
| **Draft** | A checklist for the tier, with an example photo of a good upload for each item. Can leave and return. | Nothing. |
| **Submitted** | "We have your documents." Tier 1: "This usually takes two minutes." Others: "We'll decide by [time] on [day]." Can withdraw, which returns it to Draft with uploads kept. | Tier 1 runs automatically through the identity company. A clean result is Approved with no human. |
| **Selfie or identity check fails** | What to try: better light, remove glasses, hold steady. Three tries. Then: "We'll check this by hand", and it goes to the queue. Works on a weak connection by uploading a still photo instead of live video. | Falls back to a person after 3 failures. |
| **In review** | Same message with the time submitted. | The case is locked to one officer. An officer can never open a case for an organisation they belong to. |
| **Changes requested** | Which item failed and why, in plain words, with the example again. Only failed items reopen. | Officer picks a reason from a list, may add a note. |
| **Approved** | Badge appears. Anything waiting on it goes live. A message says what is unlocked. | Decision, officer, time and evidence references go to the audit log. |
| **Rejected** | The reason. "You can appeal once within 14 days, or apply again after 30 days", each as a button. | Only for forged documents, fraud signals or prohibited sellers. An honest mistake is always "Changes requested". |
| **Appeal** | A text box and optional new evidence. | A different officer decides, and the appeal cannot be repeated. The seller may still apply afresh after 30 days. |
| **Expiring soon** | Warnings 30, 14 and 3 days before a licence or a yearly business re-check lapses, with a renew button. | Automatic. |
| **Expired** | That one badge is removed. Only the listings that needed it are unpublished, not deleted. Open orders and agreements continue. | Automatic. |

**Targets:** Tier 1 automatic within 2 minutes. Everything else decided within **one working day** (Monday to Saturday, 8 am to 6 pm). The queue shows age against target.

**Suspension is separate from verification.** It is a state of the **account**: Active ─▶ Suspended ─▶ Active, or Closed. A suspended seller sees the reason and a "Respond" button. Their store shows "This store is temporarily unavailable". Orders already paid must still be fulfilled or refunded. Operations can suspend for up to 7 days. Longer needs a super admin. An account frozen by a sanctions match shows "We need to check something on your account. We'll be in touch within 2 working days" and nothing more.

---

## 7. Listings and discovery

### 7.1 Store product (Stores lane, phase 1)

The form is built for a phone and for someone who does not enjoy forms: big picture choices, presets, one question per screen, and nothing technical asked when a good default exists.

| Field | How it is asked |
|---|---|
| Photos, 1 to 8 | Camera opens in the form. Compressed on the phone before upload. |
| Name and category | Category from pictures. Name suggestions appear as they type. |
| How you sell it | Pick a unit from presets with pictures: basket, paint bucket, bag (50 kg, 25 kg, 10 kg), crate, tuber, bunch, litre, kilogram, each, live animal. |
| How much that weighs | Prefilled from the preset ("a paint bucket of tomatoes is about 4 kg") and editable. Required, so buyers can compare and delivery can be quoted. |
| Price | Per unit. The price per kilogram is shown beside it automatically. |
| How many you have | Stock. Falls with each paid order. At zero: "Sold out". |
| Fresh? | For fresh categories: picked or packed date, how long it keeps, how to store it. |
| Where it's from | Farm or town. |
| Packaged food only | The product's food regulator registration number. Checked for format at entry, and sampled by Operations. A missing or false number unpublishes the product. |
| Live animals only | At handover the seller records the veterinary movement permit number. |
| How soon it's ready | "Ready for pickup within X hours of an order." |
| Delivery | **Not asked.** Package size and suitable vehicle types are derived from the category, unit and weight. A "Change delivery settings" link lets a careful seller override. Live animals and items over the parcel weight limit are marked "Pickup or arranged delivery only" **[U5]**. |

Minimum order value per store checkout: **5,000 naira** *working guess* **[D14]**, because the payment company's flat 100 naira fee makes smaller orders poor value for the seller.

### 7.2 Product states

```
Draft ─▶ Live ─▶ Paused (by seller) ─▶ Live
           ├─▶ Sold out (stock 0) ─▶ Live (restocked)
           ├─▶ Held for review (automatic screening flagged it) ─▶ Live, or Returned for changes ─▶ Live
           └─▶ Unpublished (by Operations with a reason, or because the seller was suspended or lost a required badge)
```

- A seller at Identity verified with a payout account publishes instantly. Products are screened automatically for prohibited items and for photos already used by another Earth seller, and a sample is checked by a person afterwards.
- Editing price or stock takes effect at once and never triggers review.
- What a buyer sees when a product cannot be bought: Sold out: "Sold out", with "Tell me when it's back". Seller at their limit, paused, suspended or frozen: "Temporarily unavailable". The reason is never shown to buyers.

### 7.3 Search and browse

- One search box. Tolerates spelling mistakes and local names ("ugu", "egusi", "groundnut" and "peanut").
- Filters, in a sheet on phones: category, delivers to me, verification tier, price, sold by (unit). Sorting: relevance, nearest, price, newest.
- Relevance favours sellers who are better verified, reply faster and complete more orders. A public page explains this. No paid ranking.
- **Delivers to me.** Phase 1 has one **delivery zone**: a published list of areas in and around the launch city that the delivery companies actually serve, for example Lagos mainland, the island, Ikorodu and Epe. A product delivers to a buyer when the seller's pickup address and the buyer's address are both in the zone. Delivery between cities, for goods that do not spoil, comes in phase 4.
- Prices show in the seller's currency. A viewer in another country also sees an approximate amount in their own, labelled approximate, with the rate's time.
- Store and product pages must show a proper preview card when the link is pasted into WhatsApp, and be readable by search engines (section 15.1).
- Search may lag a change by up to 60 seconds. Public pages refresh price and stock when opened or returned to. **The authoritative check happens at "Add to cart" and again at payment**, so nobody pays a stale price.
- **Carts.** One cart per store, kept for 30 days. Quantities can be edited in the cart. Items that sell out or change price are flagged there. The carts list shows each store's cart with its total and a checkout button.
- **Orders list.** Newest first, with status, store, total and the next action. Filters: in progress, completed, cancelled.
- **Save** a store or product with a heart icon on its page. Saved items appear on buyer home. **Buy again** on any completed order refills a cart with the same items at today's prices and shows any price change before checkout.

### 7.4 Verified seller profiles and buyer requests (Bulk lane, phase 2)

This is how a mine owner or exporter joins Earth early, without any open listing that could be forged.

1. A seller with **Licence verified** for a commodity gets a public profile: organisation name, state (not the site), the commodity, the badge with issuer and date, years operating, and "Send a request". No stock, no price, no contact details.
2. A buyer who is **Identity verified** sends a **request**: commodity, specification, quantity, destination, timing, and who they are buying for.
3. Operations reviews every request for seriousness and fraud signals.
4. The seller sees the buyer's name, country and verification, and accepts or declines. No reply within 5 working days counts as declined.
5. Accepting opens a conversation between the two verified parties. Earth has introduced them. What they agree, and how they pay, is theirs.

Request states: Draft ─▶ Under review ─▶ Sent to seller ─▶ Accepted (conversation opens) · Declined · Expired (5 working days) · Returned to buyer (with a reason) · Withdrawn by buyer.

The buyer sees "Declined" or "No response" with no reason given, and a suggestion of other verified sellers.

### 7.5 Bulk listings, enquiries and requests for quotation (Bulk lane, phase 3)

Phase 3 is **not designed in detail until the legal opinion in 11.4 arrives**, because the opinion may change what Earth is allowed to record. What follows is the intended shape, so design and engineering know what is coming. It is not yet a specification to build from.

**Bulk listing fields:** commodity from a controlled list; grade and specification by commodity; origin (country and state public, exact site private); quantity, minimum order, supply frequency; price basis (fixed, linked to a named market price, or on request) and currency; delivery terms and named place, with a plain-language explanation; packaging and lead time; documents available, each with issuer and expiry; whether third-party inspection is accepted and at whose cost. Cocoa for Europe needs farm plot locations (11.5). Every bulk listing is reviewed by a person before it goes live, and expires after 60 days unless renewed.

**Enquiry** (a buyer approaching one listing):

```
Draft ─▶ Sent ─▶ Accepted by seller ─▶ conversation opens, with the listing pinned, and the seller's private details become visible to this buyer
           ├─▶ Declined by seller (buyer sees "Declined", no reason)
           ├─▶ Expired (no reply in 5 working days)
           └─▶ Withdrawn by buyer
```

Enquiry form: quantity, destination, timing, a message. The seller sees the buyer's verification before deciding. Stages shown on both dashboards: New · Accepted, in conversation · Offer open · Agreed · Closed · Declined or expired.

**Request for quotation** (a buyer asking the market): reviewed before release, sent to sellers with the right licence, accepts up to 10 responses, open for 14 days. Each response opens a conversation with an offer attached. The buyer **awards** by accepting one offer; the request then closes, and the other responders see "The buyer chose another offer". States: Draft · Under review · Open · Closed (10 responses, expiry, or by the buyer) · Awarded · Cancelled.

---

## 8. Logistics

### 8.1 The founder's rule, and what we found

The rule: Earth plugs in logistics companies that connect back end to back end, the customer chooses, Earth earns a margin. **The rule works for parcels inside a city today.** There is also a faster route than finding companies one at a time: **logistics aggregators**, where one integration gives live prices, booking and tracking across many carriers.

| Provider | What one integration gives | Notes |
|---|---|---|
| **Shipbubble** | Rates, labels, cancellations, returns, tracking events, pay on delivery, insurance. Kwik, Red Star, GIG, DHL Nigeria, Dellyman and others. | Ships from the account's own country only. **Recommended first.** |
| **Terminal Africa** | Rates, booking with pickup, tracking events, insurance, claims, customs duty estimates. About 20 carriers including DHL, FedEx, UPS, GIG, Fez, Kwik. Ships from Nigeria, the United States, the United Kingdom, Canada, Ghana, Kenya, South Africa. | **Recommended second**, as backup and for international parcels. |
| Direct carriers: Fez, Chowdeck Relay, DHL Express | Public APIs with self-serve keys. | Later, for negotiated rates or instant food delivery. GIG's API is by arrangement only. |

Both sit behind one internal interface (quote, book, cancel, track, a fixed status list), so adding a provider is an adapter, not a rebuild. Phase 1 launches with one aggregator and adds the second before opening a second city.

**What we could not find:**

- **Truck and container freight:** we found no pricing API in this region. Flexport's API cannot quote. Haul247 works by request form. Kobo360, Lori and MVX publish no developer documentation.
- **Refrigerated delivery:** we found no booking API in Nigeria.
- **Unconfirmed:** the weight a parcel courier will carry, and whether they accept fresh produce and live animals **[U5]**. This must be in writing before launch, because it decides what a store can sell for delivery.

This is why phase 1 is **one delivery zone around one city** **[D3a]**, **same-day for fresh goods**. Delivery between cities for goods that do not spoil comes in phase 4. Farm-to-distant-city fresh food needs the freight decision **[D6]** and a refrigerated partner, and is not promised in any phase here.

### 8.2 What the founder is asked to accept

The aggregators work in a way that touches the platform-only rule in two places. Both are normal for marketplaces, and both need the founder's eyes open.

1. **They bill a prepaid wallet.** Earth pays the carrier's price from its own wallet with the aggregator, and the buyer's delivery charge reaches Earth through the payment split. This is Earth's own working money, not customers' money. It needs a float, sized at about one week of delivery charges **[D12]**. Finance gets a low-balance alarm, and checkout stops offering a provider whose wallet cannot cover the booking.
2. **The carrier's contract is with the account holder, which is Earth.** A buyer with a late or damaged parcel will come to Earth first. So the product includes delivery support, proof of delivery, and insurance claims through the aggregator. This is staffing, of the kind the founder wants to keep small. At launch volumes it is part of one operations person's day.

Reselling delivery at a marked-up price must be allowed by the aggregator's terms **[U4]**.

### 8.3 Choosing delivery at checkout

```
Cart (one store) ─▶ Delivery address ─▶ Earth asks the providers ─▶ Options appear ─▶ Buyer picks ─▶ Review ─▶ Pay
```

1. Address: area and street from lists, a landmark in words, phone number, and optional "Use my current location". An address outside the delivery zone is told so at once, with pickup offered where the seller allows it.
   The cart's **total weight** is checked against what parcel couriers will carry **[U5]**. Over it, only van options and pickup are shown, and if there are none the buyer is told which items to remove or to split the order.
2. Quotes are requested once the address is confirmed and appear as they arrive. After 10 seconds the buyer sees whatever has arrived. *The 10 seconds is a working guess to be tested against the real providers.*
3. Each option: provider name and logo, vehicle (bike, car, van), one price (carrier's price plus Earth's margin plus any insurance), arrival estimate. Cheapest and fastest are labelled. Fresh goods see same-day options only.
4. **Collect it myself** is offered whenever the seller allows pickup.
5. **If no quotes arrive:** "No delivery company can take this order right now." Buttons: Try again · Collect it myself (if allowed) · Message the seller · Keep it in my cart.
6. **The delivery price is fixed for the buyer at payment.** The provider is booked later, when the seller marks the order ready, and the carrier's price may have moved. **Earth absorbs an increase up to the naira margin it charged on that order** (**[D2b]**), so at worst it earns nothing on that delivery. Above that, Earth books the next suitable option at the same price where one exists. If none exists, the order moves to **Awaiting buyer's decision** (12.1): the buyer has 30 minutes to pay the difference through a top-up payment linked to the order, switch to pickup, ask for 30 more minutes once, or cancel for a full refund. No answer cancels and refunds. The buyer is alerted by WhatsApp at once (12.4), and the seller is told the order is on hold. A cancellation here never counts against the seller. Finance sees the cost of drift weekly. A delivery quote shown at checkout is valid for 15 minutes and refreshes in place.
7. Fresh goods carry the notice: "This delivery is not refrigerated."
8. Insurance is included automatically on orders above 50,000 naira *working guess* **[D15]** where the provider insures that category **[U5]**, and its cost is inside the one price shown.
9. **Accessibility of timers.** Nothing in checkout expires while the buyer is on the screen without a visible warning 2 minutes before, and an "I need more time" button that extends it once. Quote refresh happens in place and announces any price change in words.

### 8.4 Booking and tracking

- Earth books the chosen provider when the seller marks **Ready for pickup**, so no rider waits at a gate.
- Provider statuses are translated into Earth's fixed list (12.1). Buyer, seller and Operations see the same status at the same moment.
- A provider's message is treated as a hint: Earth re-reads the delivery from the provider before changing status, never moves a status backwards, and ignores repeats. If an active delivery is silent for 30 minutes, Earth asks the provider.
- Delivery is confirmed by a 4-digit code the buyer gives the rider, or a photo from the rider, stored on the order. Whether each aggregator can enforce a code on its riders, or return the photo to Earth, is unconfirmed **[U17]**. Where it cannot, the provider's own "delivered" event is the record, and the buyer's Confirm tap is asked for more insistently.
- **No rider found, or the booking fails:** Earth tries the next suitable provider under rule 6 above and tells both parties. If none, the buyer chooses: wait, collect, or cancel for a full refund.
- **Delivery failed** (nobody home, wrong address): the provider's first retry applies. A further attempt or a return trip is charged to whoever caused it. The buyer pays through a top-up payment linked to the order, sent in the conversation. A seller's share is added to their seller debt (9.4). If it remains unresolved after 48 hours, goods return to the seller and the order goes to Operations to decide the refund.

### 8.5 Freight for the Bulk lane (phase 3)

Because no pricing API exists, freight for bulk agreements is a **quote request inside the conversation**: the form fills from the agreement, Earth sends it to freight partners it has vetted, an Operations person records each partner's quote, and quotes appear as cards with Earth's margin as a visible line. When partners offer APIs, the same cards fill automatically.

This bends the back-end-to-back-end rule for this one lane, because the industry offers nothing else yet. **[D6]** asks the founder to allow it, or to leave freight out of the Bulk lane.

---

## 9. Money

### 9.1 The founder's rule, and how it is kept

The rule: Earth takes a percentage and never becomes the escrow. It is kept by using a licensed payment company's **split payment**. Each seller is registered with the payment company against their own bank account. When a buyer pays, **the payment company** divides the money. The seller's share goes to the seller's bank account, and the rest goes to Earth's. Customers' money is never in an account Earth controls.

Whether operating this way keeps Earth outside central bank licensing is our reading, and a lawyer must confirm it before launch **[U7]**, inside **[D10]**.

| Provider | Confirmed | Cost |
|---|---|---|
| **Paystack** (recommended) | Sellers as sub-accounts tied to their own bank account. A payment can be divided by percentage or by fixed amounts. | 1.5% plus 100 naira on local payments, capped at 2,000 naira, the 100 waived under 2,500. 3.9% plus 100 on international cards. |
| **Flutterwave** (fallback) | Sub-accounts and splits, next-day local settlement. | 2% local, 4.8% international, plus tax on the fee. |
| Squad, Monnify | Sub-merchant settlement exists. Details not confirmed. | — |

### 9.2 The split rule, exactly

**One store, one order, one main payment.** An order may also have small linked top-up payments for delivery (8.3, 8.4). A buyer with items from three stores checks out three times. This is a deliberate phase 1 simplification: it makes the split, the fee, refunds and disputes unambiguous. Paying once for several stores returns only after the payment company confirms in its test system that one payment can be divided among several sellers in fixed amounts **[U14]**.

For every payment, Earth's server calculates fixed amounts and sends them with the charge. Percentages are not used, because a percentage cannot express "commission on the goods only, all of the delivery to Earth".

```
Buyer pays                     = goods + delivery
Seller receives                = goods − commission − tax on the commission − payment fee on the goods   [D8]
Earth receives                 = everything else, and bears the payment company's fee on the whole payment
   of which, Earth's earnings  = commission + (delivery − carrier's price) − payment fee on the delivery part
   of which, owed onward       = carrier's price (to the logistics wallet) and tax on the commission (to the tax authority)
```

- The payment fee is estimated as for a local card, and the flat 100 naira part falls on the goods, so on the seller. If the buyer uses an international card, the higher fee (about 276 naira more on the example in 9.3, roughly a third of Earth's earnings on that order) is Earth's cost. Finance sees the variance, and 9.4 limits where international cards are accepted.
- Commission is set per category. An order with items from two categories is calculated line by line. Amounts are whole kobo. Rounding always favours the seller, and the difference falls to Earth.
- The commission rate that applies is the one in force when the payment is started.
- **Top-up payments** (a delivery price difference, a further delivery attempt, a return delivery) go wholly to Earth, since they pay for delivery. Each is its own ledger entry linked to the order, with no commission. The payer bears the payment fee inside the amount shown. A top-up has the same Confirming and Failed states as any payment (14.2), and an order never waits on one for longer than the timer that asked for it.
- Every order has a ledger: each line above, with its tax, stored at payment and never recalculated.

### 9.3 What Earth earns: worked example

A 10,000 naira basket, 1,500 naira delivery, local card. Payment fee on the whole payment: 1.5% of 11,500 plus 100 = 272.50 (250 on the goods, 22.50 on the delivery). Delivery margin is 10% on the carrier's price, so the carrier's price is 1,363.64.

| Commission rate | Seller receives | Share of basket | Earth's earnings per order | One unrecovered reversal of 11,500 costs |
|---|---|---|---|---|
| 5% | 9,212.50 | 92.1% | 613.86 | 19 orders |
| **7.5% (recommended)** | **8,943.75** | **89.4%** | **863.86** | **13 orders** |
| 10% | 8,675.00 | 86.8% | 1,113.86 | 10 orders |

At 7.5%: commission 750, value added tax on it at 7.5% = 56.25 (collected from the seller, passed to the tax authority; the two 7.5% figures are a coincidence), payment fee on goods 250. Earth: 750 + 136.36 − 22.50 = 863.86.

Why we recommend 7.5% **[D2a]**: at 5% one bad order erases nineteen good ones, which is too thin to fund the support that fresh food needs. At 7.5% the seller still keeps 89%, against the third of the city price that middlemen pay today, and verification is free. 10% is defensible later, once sellers see the sales.

**Not yet in these numbers:** the identity check fee per seller, WhatsApp and SMS messages per order, the price-drift allowance in 8.3, and tax on the delivery charge. Earth buys delivery and resells it, so tax may be due on the whole delivery charge, not just the margin. An accountant must rule on this **[U15]**. If it is, the margin on delivery mostly disappears, and the delivery margin in **[D2b]** should rise.

**Break-even, stated plainly.** Monthly running cost divided by about 860. The team in 17.3 will cost several million naira a month, so break-even is **several thousand orders a month**: for illustration, 3,000,000 naira needs about 3,500 orders, and 6,000,000 needs about 7,000. The working target of 1,000 orders a month three months after opening earns about 860,000 naira. **So the first year is investment, not profit**, and Earth pays its own way only with more cities, higher order values, or the Bulk lane's income.

### 9.4 The risk the no-escrow rule leaves, and how it is contained

Earth is the merchant on every payment. Flutterwave's documentation says disputes and reversals are logged against the platform's account, and Paystack's says reversals are deducted from the merchant's payouts. For refunds made after a seller has already been paid, we have only a third-party guide **[U3]**.

**The sequence that costs money:** the buyer pays. The seller is paid the next working day. Later the goods prove bad, or the card was stolen, and the payment is refunded or reversed. The payment company takes the amount from **Earth's** balance, which holds only Earth's own earnings and delivery money **[U3]**. The seller already has theirs. In Nigeria a reversal claim must be answered within about 16 hours or it is lost.

| Control | How it works |
|---|---|
| **Pay the seller after the problem window** **[D4]** | The payment company holds each seller's share and pays it out when Earth tells it the order's problem window has closed with no dispute (24 hours after delivery for fresh goods, 48 otherwise). **The licensed payment company holds the money, never Earth.** A refund inside the window then comes out of the held share first, so no debt arises for that part. Only the excess over the held share, on a full refund, becomes debt. This is the strongest protection. It may be what the founder meant by "when you pay, you confirm" (Q1). **To be plain: releasing money on Earth's instruction is close to what an escrow does, even though Earth never holds it.** The lawyer must confirm it stays on the right side of the line **[U7]**, and the payment company must confirm it can do it **[U1]**. |
| **Seller debt ledger** | A refund or reversal that Earth had to fund, and that was the seller's fault, becomes that seller's debt under the seller terms, for the amount in 9.9. It is recovered by reducing the seller's share of later payments by up to 30% each until cleared. A seller with no sales for 30 days is invoiced and cannot take new orders until it is paid. After 90 days it is written off and counted as a loss against **[D11]**. The seller sees the debt, the reason and the repayments on their payouts screen. |
| **New-seller limit** | Section 9.5. Caps what any one new seller can cost. |
| **Refund reserve** | Earth keeps part of its own money in its payment-company balance so refunds never fail for lack of funds: the larger of 200,000 naira or 5% of the last 30 days' payment volume *working guess*. It opens with **[D12]** and is topped up from earnings as volume grows. Finance is alerted below it. Whether the payment company lets a balance be kept this way is unconfirmed **[U18]**. |
| **Delivery evidence** | Code or photo on every order (8.4). This is the main evidence in a reversal claim. Whether the aggregators can enforce a code or return a photo is unconfirmed **[U17]**. |
| **Card rules** | International cards are not accepted for collect-it-myself orders, or for sellers still on their first limit. Each buyer and each card has a daily and weekly spending limit across Earth. These close the cheapest fraud route: a stolen card, a colluding seller and no delivery record. |
| **Refunds a seller agrees to** | A seller tapping "Agree" on a dispute does not release money by itself if the seller has already been paid, or if the amount is over 20,000 naira. Operations approves those first. |
| **Reversal alarm** | Every reversal claim alerts Operations at once with an evidence pack built in one action: order, product as sold, delivery proof, and the conversation (access allowed under 10.7). Someone must be reachable every day, including weekends. |
| **Verified payout account** | Name match (6.2), and a 48-hour hold on any change (6.1). |

**[D11]** asks the founder to accept this exposure. **The monthly figure in D11 is an alarm, not a ceiling.** Reversals can arrive weeks after the orders that caused them, so losses already in the pipeline can exceed it. When the alarm sounds, seller limits tighten automatically, international cards are switched off, and the founder is told the same day. **What the limits in 9.5 bound is the loss from orders still counted as at risk**, and Finance sees that sum on its dashboard. A reversal that arrives after an order has stopped counting is not bounded by them. It is contained by the card rules and seller debt, and it is what the alarm exists to catch.

Refund states, shown to the buyer: Requested ─▶ Processing ─▶ Refunded (with the expected arrival, usually 5 to 10 working days for cards), or Queued (the reserve is short; Finance is alerted; the buyer sees "Processing") or Failed (Operations contacts the buyer).

### 9.5 Seller limits

A monthly sales cap would strangle exactly the sellers Earth wants: one good harvest is more than half a million naira. The limit is therefore on **money at risk**, and it lifts with track record, not paperwork.

**Money at risk** for a seller is the value of their paid orders that are not yet *settled in Earth's eyes*. An order stops counting 14 days after it completes with no dispute. Under **[D4]** the same 14 days apply, but once the held share has been released the order counts at half its value, because a late reversal is then Earth's to recover.

| Seller | Limit on money at risk **[D5]** *working guesses* | How it lifts |
|---|---|---|
| Identity verified, new | 100,000 naira. This is at or below the opening refund reserve, so one bad seller cannot empty it. | Automatically |
| 10 completed orders from at least 5 different buyers and 5 different cards, with at most 1 dispute decided against the seller | 500,000 naira | Automatically |
| Business verified, or 50 completed orders with under 5% of them disputes decided against the seller | 3,000,000 naira | Automatically. Anything above 3,000,000 is raised case by case by Finance. |

- Counting only orders from different buyers and cards stops a seller lifting their own limit with ten small orders to themselves.
- The limit is checked and reserved at the moment a payment is started, and released if the payment is abandoned, so two buyers cannot both slip under it. A buyer who would push the seller over sees "Temporarily unavailable". The seller is told as they approach it, with the ways to lift it.
- There is never "no limit". Every seller has a number, so Earth's worst case is always a known sum.
- **With [D4], the second and third limits can be roughly three times higher**, because most money at risk is then sitting with the payment company, not with the seller. That is the difference between a cooperative selling a tonne comfortably and not. The new-seller limit stays at or below the refund reserve either way.
- A dispute the two parties settle between themselves, like a bruised basket refunded by agreement, does not count against the seller here. Only disputes that Operations decides against the seller do, as in 12.6.

**What the limit does not cover:** a card reversal that arrives months later, after the order has stopped counting. Who bears it follows 9.9: seller debt where there is no delivery proof, Earth's loss where the seller delivered in good faith and the claim is lost. Either way it counts toward the **[D11]** alarm.

### 9.6 Other income: proposals for the founder

The founder named two income lines: stores and logistics. Those are in. The Bulk lane cannot earn a percentage at source, because those payments never touch Earth. These are **proposals**, not decisions **[D13]**:

| Proposal | What | Note |
|---|---|---|
| Bulk seller subscription | A monthly or yearly plan for Licence-verified sellers: profile, requests, listings, the document store, agreement records. | Prepaid, so it cannot leak. The simplest honest model for this lane. |
| Licence verification fee | A one-time fee for checking a mining title or export licence, which takes real staff time. Tiers 1 and 2 stay free. | |
| Partner referral fees | From inspection firms, freight partners, licensed escrow companies, banks. | |
| Success fee on closed agreements | A percentage of a closed bulk agreement, invoiced to the seller. | **Not recommended until the lawyer has looked.** Earning a percentage on commodity trades is what a "commodity broker" does, and that title is reserved under the same law as "commodity exchange". It also leaks, since parties can close elsewhere. |

### 9.7 Currency and who can use Earth from abroad

- Every product has one currency, the seller's. The buyer is charged in it. Phase 1 is naira.
- A buyer abroad can pay by international card from phase 1, within the card rules in 9.4. What they can sensibly buy from abroad begins in phase 2 (introductions) and phase 3 (bulk). Section 17.2 states this for each phase.
- Dollar-priced store products wait for phase 4: dollar settlement needs a specific domiciliary account, and it is unconfirmed whether split payments work on dollar charges **[U2]**.
- Sellers outside Nigeria need Earth to have a United States or United Kingdom company, because Stripe does not serve Nigerian companies directly, and its self-serve marketplace payouts work only between the United States, United Kingdom, Europe, Canada and Switzerland **[D7]**.

### 9.8 Cancellations and refunds

| Situation | What happens | Who bears the cost |
|---|---|---|
| Buyer cancels before the seller accepts | Full refund, automatic | Earth bears the payment fee |
| Seller declines, or does not accept in time (12.1) | Full refund, automatic. Counts against the seller's completion rate. | Payment fee added to seller debt |
| Seller cannot fulfil after accepting (Owner or Manager, with a reason) | Full refund, automatic. Counts against the seller's completion rate. | Payment fee added to seller debt |
| Buyer asks to cancel after acceptance, before pickup | The seller has 2 hours (within opening hours) to agree or refuse. No answer counts as agreed. | Buyer, if a delivery was already booked and the provider charges for cancelling |
| After pickup | Cannot be cancelled. It becomes a delivery matter or a dispute. | — |
| Not delivered | Full refund including delivery | Provider claim if the carrier lost it, otherwise seller debt |
| Delivered but wrong, short or spoiled | Dispute (12.3) | By decision |
| Change of mind after delivery | Goods that do not spoil: return within 7 days, buyer pays the return delivery, refund of the goods when the seller confirms receipt. Fresh goods: not returnable unless faulty. | Buyer |

The returns and refunds policy is published and meets consumer protection law (11.5). A blanket "no refunds" policy is not lawful for consumer sales.

### 9.9 Who bears what on a refund

The buyer's refund always comes from Earth's balance with the payment company (or from the held share, under **[D4]**). This table says who ends up bearing it. **"The payment fee"** below means the payment company's whole fee on the original payment (272.50 in the example in 9.3), which the payment company never returns.

| Case | Buyer receives | Earth gives up | Becomes seller debt | Earth's loss |
|---|---|---|---|---|
| Buyer cancels before the seller accepts | Everything paid | Commission, tax on it, delivery margin | Nothing (the seller has not been paid: payout is next working day at the earliest) | The payment fee |
| Seller declines, times out, or cannot fulfil | Everything paid | Commission, tax, delivery margin | The payment fee, plus any share already paid out | Nothing |
| Not delivered, seller's fault | Everything paid | Commission, tax, delivery margin | The share paid to the seller, the carrier's price Earth paid, and the payment fee | Nothing, once recovered |
| Wrong, short or spoiled: **full refund** | Goods and delivery | Commission, tax, delivery margin | The share paid to the seller, the carrier's price, and the payment fee | Nothing, once recovered |
| Wrong, short or spoiled: **part refund of amount R** | R | Commission and tax on R, pro rata | R, less the commission and tax Earth gave up | Nothing, once recovered |
| Lost or damaged by the carrier | Goods and delivery | Commission, tax, margin, until the claim pays | Nothing | Whatever the carrier's insurance does not pay |
| Card reversal, delivery proven | — | — | Nothing. The seller delivered in good faith. | Earth contests with the evidence. If it loses, the whole payment. |
| Card reversal, no delivery proof | — | Commission, tax, margin | The share paid to the seller, and the payment fee | The carrier's price, unless recovered |
| Change-of-mind return | The goods price, once the seller confirms receipt | Commission and tax | The share paid to the seller for those goods | Nothing |
| Buyer cancels after acceptance, before pickup (seller agrees or is silent) | Everything paid, less any cancellation charge the logistics provider makes | Commission, tax, delivery margin | Nothing | The payment fee |
| Cancelled or timed out from "Awaiting buyer's decision" | Everything paid | Commission, tax, delivery margin | Nothing. Nobody was at fault. | The payment fee |
| Delivery failed through the buyer's fault, goods returned to the seller | The goods price. Delivery is not refunded, because it was used. | Commission and tax | The share paid to the seller | Nothing |
| Never collected (collect-it-myself), cancelled by Operations | Everything paid, less the payment fee, which the buyer bears. This is stated at checkout when pickup is chosen. | Commission and tax | The share paid to the seller | Nothing |
| 24-hour timeout while the store was closed throughout | Everything paid | Commission, tax, delivery margin | Nothing | The payment fee |
| Late payment on an abandoned attempt that cannot be honoured; or a payment made twice | Everything paid on that payment | Nothing was earned | Nothing | The payment fee |

Every line is written to the order's ledger as its own entry, with its tax, and the original entries are never altered.

---

## 10. The conversation

Research on comparable marketplaces is blunt. Platforms that only matched buyers and sellers lost them: Open Mineral, launched as a trading venue, now describes itself as a commodity trader, and Tridge's site now leads with data products. Platforms that owned trucks and warehouses ran out of money: Twiga was reported in administration in 2026, and Vendease cut nearly half its staff. What keeps users is the work around the deal. So the conversation is not a chat box beside the product. It is where the deal happens, and it has to be as fast as WhatsApp or people will go back to WhatsApp.

### 10.1 What a conversation is

| | **Stores lane** | **Bulk lane** |
|---|---|---|
| How many | **One conversation per buyer and store**, for ever, like a WhatsApp chat. | **One conversation per accepted request, enquiry or quotation response**, so each negotiation has a clean record. |
| What is pinned at the top | The most recent open order, or the product the buyer came from. Older ones are one tap away in "Orders in this chat". | The listing or request, then the agreement record once an offer is accepted. |
| Who can see it, seller side | Every member of the seller's organisation: Owner, Manager, Staff. | Owner and Managers, plus any member they add. |
| Who can see it, buyer side | The buyer. | Phase 3: the buying organisation's Owner and Managers, plus anyone they add, including Viewers. |

- Orders, offers, delivery updates and documents appear **inside** the conversation as cards in time order, so the thread reads as the full history.
- **Adding people.** An Owner or Manager can add a member of their own organisation. The thread records "Bola added Sade". A removed member loses access at once (15.4). Nobody can add a person from outside the two parties in phases 1 to 3.
- **Read status is per person and shown per side.** The buyer sees "Seen" when any member of the store has opened the message. Inside the store, members see which colleague replied.
- There is no assignment of conversations to individual staff in these phases. Everyone with access sees unanswered messages.

### 10.2 Putting things into a message

Every one of these has a button under the **+** beside the message box. The typed shortcuts are for fast users on keyboards.

**The + menu, phase 1:** Photo · Voice note · Product · Make an offer · Location.
**Added in phase 2**, because verified parties start talking then: Share a document · Add a colleague.
**Added in phase 3:** Listing · Bulk offer · Request a document · Freight quote · Inspection.

The engineering lead asked that products, services, people and documents can all be brought into the chat. Products are the `#` card. People are `@`. Services are delivery (the delivery card, and the freight quote in phase 3) and inspection. Documents are the share and request cards.

**Order card:** order number, items, status, and total (hidden from Staff). Tapping opens the order. **Delivery card:** company, vehicle, status, arrival estimate, and the rider's first name where shared.

| Thing | Shortcut | What appears | Rules |
|---|---|---|---|
| A person | `@` | Their name, highlighted. They are notified even if they have muted the chat. | The picker lists people who already have access. For an Owner or Manager it also lists, under a divider, colleagues in their own organisation who do not, each with "Add to conversation". **Mentioning never grants access by itself.** In a Stores conversation every store member already has access, so `@` there is simply a way to get a colleague's attention. |
| A product or listing | `#` | A card: small photo, name, unit, price, stock, the seller's badge, and a button. | The picker shows **only this store's products** (or, in the Bulk lane, this seller's listings). A buyer cannot paste a competitor's card. The card freezes name, unit and price as posted, and shows "Price changed since" if it has. Buttons: "Add to cart" for the buyer. |
| An action | `/` | Opens the same forms as the + menu. | — |

**When shortcuts trigger.** Only at the very start of a message or straight after a space, and only if the next character is a letter. So "21/9", "50/50", "#1" and an email address never open a picker. Pressing Escape, or typing a space, closes the picker and leaves the text as typed. Pickers work with a keyboard and a screen reader: arrow keys move, Enter chooses, and the choice is announced.

**Cards and screen readers.** A card is read as one sentence, for example: "Product. Tomatoes, one basket, about 20 kilograms, 9,000 naira, in stock, from Bola Farms, identity verified. Button: add to cart."

### 10.3 Offers

An offer is a structured card, never a sentence, because "ok deal" cannot be relied on later.

**Phase 1, the price offer (Stores lane).** Fields: product, quantity, price per unit, valid until (default 24 hours, at most 72).

```
Sent ─▶ Accepted ─▶ becomes a checkout for this buyer only, at this price, for this quantity
   ├─▶ Declined
   ├─▶ Replaced (either side sends a new offer on the same product; the old one closes and can never be edited)
   ├─▶ Withdrawn (by the sender, only before it is accepted)
   └─▶ Expired
```

- Either side can make an offer. **One open offer per product per conversation.**
- Seller Staff can make or accept offers only up to the total value the Owner has set for them. With no limit set, they cannot.
- Accepting shows the terms again and asks for confirmation. Accept, withdraw and replace are decided by the server against the offer's current version. If two people act in the same second, the first valid action wins and the other sees "This offer was just withdrawn" (or accepted).
- **An offer cannot be sent or accepted offline.** The button is disabled with the reason.
- An accepted offer holds no stock. Its checkout is single use, belongs to that buyer, and checks stock, the seller's limit and the offer's expiry again when payment starts. If the offer expires mid-checkout the buyer is told before paying, and can ask the seller to renew it in one tap.
- Offers are one purchase. There are no standing or recurring orders in these phases. "Buy again" (7.3) covers the weekly habit.

**Phase 3, the bulk offer** adds: specification, delivery terms and place, delivery window, payment terms, inspection terms. Same states. Accepting creates an agreement record (12.2), subject to the legal opinion in 11.4.

### 10.4 Documents (sharing from phase 2, requests from phase 3)

- **Request a document:** choose a type from the list for that commodity, and a due date. States: Requested ─▶ Uploaded ─▶ Accepted, or Returned with a reason, or Expired.
- **Share a document** from the organisation's document store, so a licence is uploaded once. A share is pinned to the version shared. A newer version must be shared again. The owner can revoke a share, and access ends then.
- A newly uploaded file shows "Checking this file" until a malware scan finishes, and cannot be opened before.
- Each file is stored privately and fingerprinted (SHA-256, recorded in the audit log at upload) so later tampering is detectable. Every view is logged with who and when.
- Files open through links that must be used within 60 seconds of being issued, and only in the signed-in session that asked for them. A download that has started may finish.
- **View-only with a watermark** of the viewer's name and the time is available for sensitive papers. It is produced on the server as images, so the original file never reaches the viewer. This **deters and traces** copying. It cannot prevent a photograph of the screen, and the product never claims it can.
- Inspection reports ordered through Earth are delivered by the inspection company into the conversation. A report uploaded by a seller is labelled "Provided by the seller. Not verified."
- Either party can export the conversation's structured history as a PDF: every offer version, acceptance, document event and participant change, with times.

### 10.5 Voice notes

Many users would rather talk. Voice notes are supported with limits: up to 2 minutes, recording states (recording, paused, sending, failed with retry), and a playback speed control. **Voice notes are not transcribed or screened in phase 1**, and the product says so where it matters: nothing binding can be done by voice. Prices, offers and documents exist only as cards. A text alternative is always available beside the record button, and transcription is planned for a later phase for accessibility.

### 10.6 On a weak connection

- The server gives every message in a conversation a running number. That number is the order everyone sees, whatever their phone's clock says.
- A message written offline waits in an outbox with a clock icon. The phone gives it an identity, so if it is sent twice it is stored once. When the connection returns, the outbox sends in order and the application asks the server for everything after the last number it has.
- If too much was missed (more than 200 events), the application reloads the conversation instead of replaying.
- Typing indicators and "online now" are fleeting and never replayed.
- An outbox message is checked again when it sends. If the person has lost access in the meantime, it is rejected and they are told.
- If the other side is offline (no member of that organisation has the application open), they are notified by push where the phone supports it, and by WhatsApp or SMS after a delay the user can set (12.4).
- Text messages can be edited for 15 minutes and show "edited". The original is kept for the record and is visible only under 10.7. Cards can never be edited or deleted.

### 10.7 Privacy and safety, stated precisely

- **Conversations are not end-to-end encrypted.** They are stored on Earth's servers and processed automatically to deliver them, to search a user's own messages, and to detect likely scams.
- **No Earth employee can open a conversation unless** (a) a participant reports it, (b) a dispute or a payment reversal exists on an order in it, or (c) a lawful request requires it. Because a Stores conversation lasts for ever, access covers **only the messages from 7 days before that order was placed until it is resolved**, and an evidence pack sent to the payment company contains only those. Access ends after 14 days and is logged where super admins can see it. Direct database access by engineers is break-glass only, with a recorded reason.
- Automatic screening stores flags ("possible request for upfront fee"), not excerpts.
- WhatsApp and SMS alerts never contain message text by default: "You have a new message from Bola Farms" and a link. Users can opt in to previews.
- **Scam warnings** appear on messages that look like a request for an upfront fee, pressure to hurry, or a request to pay outside Earth in the Stores lane. The warning has a one-tap report.
- **Contact details.** In the Stores lane, phone numbers and emails typed as text are masked before the first order, and the sender sees a notice explaining why. This is best effort. It does not cover photos or voice notes, and after the first delivery the buyer and seller have each other's numbers anyway. **So repeat business can move off Earth, and commission can leak.** The defence is that ordering on Earth is easier: delivery choice, tracking, buy again, and a seller's growing track record.
- Reporting a message shares that part of the conversation with Operations, and the report screen says so.
- **Reporting a listing or a person** (from any product, store or profile page): choose a reason (prohibited item, fake or stolen photos, scam, abuse, other), add a sentence and optional screenshots. The reporter is told it was received, and told the outcome in general terms. Reports go to the Operations queue.

---

## 11. Trust, categories and the law

This is product research, not legal advice. Items marked **needs a lawyer** are inside decision **[D10]**, which we recommend starting in week 1.

### 11.1 Categories by phase

This order is decision **[D3b]**.

| Group | Categories | Lane | Phase | Seller must hold |
|---|---|---|---|---|
| **A** | Fresh food, grains, tubers, oils, eggs, poultry, packaged food, animal feed, farm inputs | Stores | 1 | Identity verified. Packaged food: the product's food regulator number. |
| **A2** | Livestock, domestic. Firewood and timber, **domestic sale only**. Items too heavy for parcel couriers. | Stores, pickup or arranged delivery | 1 | Identity verified. Livestock: a veterinary movement permit field. |
| **B** | Bulk domestic lots that need no licence: truckloads of grain, cattle herds, bulk feed | Bulk | 3 | Business verified |
| **C** | Export crops: cocoa, cashew, sesame, ginger, hibiscus, shea | Bulk. Verified profiles in phase 2, listings in phase 3 | 2, 3 | Licence verified: exporter's certificate, and per-shipment phytosanitary and inspection certificates |
| **D** | Industrial minerals, tin, lithium ore, gemstones, metals | Bulk. Verified profiles in phase 2, listings after phase 3 has run 90 days | 2, 4 | Licence verified: mining title or buying-centre licence. Site inspected for listings. |
| **E** | **Gold and precious metals** | Bulk. **Verified profiles and buyer requests in phase 2.** Open listings in phase 4. | 2, 4 | Licence verified. For listings: Site inspected and an assay from a named laboratory. No artisanal or "gold dust" listings. |
| **F** | Cooking gas, diesel, lubricants from marketers licensed by the petroleum regulator, within Nigeria | To be considered | After 4 | — |
| **Never** | Crude oil and gas cargoes. Export of wood. Items on the national prohibited export list (including maize, raw hides, unprocessed rubber, scrap metal). Wildlife. Charcoal for export is treated as prohibited until confirmed **[U12]**. | — | — | — |

### 11.2 The gold mine question

The founder asked: "If I have a gold mine, can I come here? I should be able to." **Yes, in phase 2**, about six weeks after the stores open, which is about month 7 (17.1):

1. Tunde signs up, becomes Identity and Business verified, and uploads his mining title.
2. Operations checks the title with the Mining Cadastre Office **[U6]**. He receives **Licence verified: gold** and a public "Verified mineral seller" profile. It shows no stock, no price, and no site location.
3. Verified buyers send him requests. Operations screens each one. He accepts the ones he likes, and a conversation opens between two verified parties (7.4).

The mine owner is on Earth and meeting serious buyers early, and nothing is on the platform that a fraudster could forge. There is no listing to fake.

**Open gold listings come last, in phase 4.** Gold is among the most commonly forged commodities in West African trade, and the reported pattern is consistent: forged papers, urgency, an upfront fee. The refiners who set the world standard will not buy gold without traceable origin, and international buyers are bound by rules on minerals from high-risk areas. A listing without a title, an inspection and an assay is worthless to the buyers the founder wants. Selling minerals legally in Nigeria requires a mining title, or a licence to possess and purchase or to run a buying centre. Exporting needs a permit for each shipment and proof of royalty payment.

### 11.3 The public website says things that are not true yet

The live website was written as a vision. Now that there is a product plan, several lines promise what Earth will not do, or list goods Earth should never list. We have **not** changed the live site or the deck, because the wording is the founder's to approve **[D1] [D3c]**.

| Where | What it says today | Problem | Recommend |
|---|---|---|---|
| Hero, page title, link preview text, closing section, deck (24 places) | "A global exchange" | Section 11.4 | "Marketplace", or simply "Earth" |
| Product table (`Catalogue.tsx`) | Gold "On request", Crude oil "By contract", Timber "Available", Natural gas "By contract" | Reads as stock. There is no stock and there are no sellers. | Retitle "What you will find on Earth", remove the status column, remove crude, gas and export timber |
| "Verify" and "Trade" panels (`WhyEarth.tsx`) | "Quality, quantity and documentation are checked at origin and confirmed before cargo moves." "Contracts and logistics are handled end to end." | Earth does not inspect, and does not handle contracts. Both contradict section 2.2. | "Sellers are verified, and every badge says what was checked." "Buyers and sellers agree terms in one conversation." |
| Categories heading (`Categories.tsx`) | "What we deal in … verified supply" | Dealer language. Earth does not deal. | "What you can find on Earth" |
| Energy category | "Crude oil, refined products and natural gas" | The national oil company sells crude only to buyers it screens, on yearly contracts. Its own marketing head has said about 98% of documents in offered crude deals are forged (reported by Pulse). A real cargo does not need a public marketplace. | Remove. Offer Group F later as the honest energy answer. |
| Forestry category | "Timber, hardwood and processed wood products" | A presidential order of December 2025 bans the export of wood and cancelled existing permits. Sending it to the United States could also breach United States law on illegally sourced plants. | Keep as domestic only, and say so |
| Deck, slide 4 | "an oil block: yes" | Same as energy | Remove |
| Footer | Placeholder contact details, no company name | The waitlist collects personal data and must name who is collecting it **[D9]** | Real details |

### 11.4 The word "exchange", and the Bulk lane (**needs a lawyer**)

We read the statute itself. The **Investments and Securities Act 2025**:

- **Section 224(1):** "A person shall not establish or maintain or hold himself out as providing or maintaining a commodity exchange unless such exchange has been registered by the Commission."
- **Section 238(1):** nobody else may "take or use the title or description … 'commodity exchange', 'commodity broker', 'spot commodity broker', 'commodity trading adviser' …", or any title that "resembles" them. Penalty: not less than 10,000,000 naira, plus 20,000 naira for each day it continues.
- **Section 357:** a commodity exchange includes "an electronic system, whether operating in Nigeria or elsewhere, through which trading in commodity contracts is carried out". "Commodity" expressly includes agricultural produce and solid minerals. A "commodity contract" is "any contract in relation to a commodity". It excludes a facility that "merely provides price or other information" and "does not permit users … to channel orders for, execute transactions in, or make markets in, commodity contracts".

There are two separate risks here, and the second is the bigger one.

1. **The name.** Cheap to fix: stop saying "exchange" in public **[D1]**. The founder's phrase "an exchange of commodities" was ordinary speech and is not the problem. A public headline is.
2. **The function.** Renaming does not cure this. A system where offers on commodities are made and accepted electronically may be "trading in commodity contracts", whatever it is called. The Stores lane, which is ordinary retail of goods at fixed prices, is far from this line. Phase 2 introductions, where Earth introduces two verified parties who then agree their own contract, are close to the "information" exclusion. **Phase 3, where offers are accepted and an agreement is recorded inside Earth, is the part that needs the opinion [U8].**

**What we recommend:**

- Commission the opinion in **week 1**, not before phase 3, so that nobody designs or builds phase 3 on a guess **[D10]**.
- Ask the lawyer four questions: Does recording an accepted bulk offer count as executing a commodity contract? Does a success fee make Earth a commodity broker? Are "deal", "trade" and "agreement" safe words in the product? Would partnering with, or registering alongside, a licensed exchange such as AFEX be a better route for the Bulk lane?
- Until it arrives: no phase 3 design spend beyond section 7.5's outline.

### 11.5 Consumer protection, data and screening

| Rule | What it requires of the product |
|---|---|
| **Consumer protection** | The price displayed equals the price charged. Material facts disclosed. A right to return within a reasonable time, and a full refund on cancellation less reasonable charges. A visible complaints route. |
| **Data protection** (Nigeria Data Protection Act; European rules for European visitors) | The collector named on every form. Consent recorded with its wording version. Identity documents encrypted and kept only as long as needed. Export and deletion on request. A named data protection officer. Safeguards for data leaving the country. A breach procedure. Registration as required **[U9]**. |
| **Sanctions** | Screening happens at **Identity verification**, when a legal name and date of birth exist, and again periodically. Screening a first name and a phone number at sign-up would only produce false alarms. A match freezes the account pending review. |
| **Anti-money-laundering**, Bulk lane | Company registry record, directors and real owners, tax number, bank account name match, screening for politically exposed persons. Identity companies found: Prembly (business checks in over 90 countries), Youverify, Dojah, Smile ID. Their coverage of United States and European companies is not confirmed **[U11]**. |
| **European deforestation rule** | Applies from 30 December 2026 to larger buyers. Cocoa sold into Europe must carry the location of the farm plots. Cocoa profiles and listings need plot location fields. This is a selling point: Sabi, a Nigerian trade platform, cut staff in 2025 and rebuilt its business around proof of origin because foreign buyers demanded it. |
| **United States food imports** | Advance notice to the food regulator, and the exporter's facility registration number. Capture that number on exporter profiles. |
| **Domestic sale of fresh produce** | We found no federal licence requirement. A lawyer should confirm **[U13]**. |

### 11.6 Fraud controls in the product

| Pattern | Control |
|---|---|
| Forged inspection or assay certificates | Inspection is ordered inside Earth from a named firm (SGS, Bureau Veritas, Intertek, Cotecna), and the report comes from the firm. |
| Forged licences | Checked with the issuer where a register exists. The badge shows issuer, number and expiry. |
| Too-good prices; delivered-to-your-port offers from new accounts | Held for review automatically (phase 3). |
| Upfront "fees", urgency, secrecy | Warning in the conversation, and one-tap report. |
| Stolen photos | Each photo's fingerprint is compared with photos already on Earth. Matching against the wider internet is not promised: there is no affordable service for it. |
| Fake buyers wasting sellers' time | Buyers must be Identity verified to send bulk requests and enquiries, and the seller sees the buyer's badge before replying. |
| Repeat offenders | Payout account, identity and device fingerprints. A banned person cannot return under a new name with the same bank account. |
| Accountability | A suspended store says "temporarily unavailable". It does not vanish. |

---

## 12. Orders, agreements, disputes, notifications and the admin console

### 12.1 Store order: every state and every move

```
MAIN PATH
  Awaiting payment ─▶ Paid ─▶ Accepted ─▶ Ready for pickup ─▶ In delivery ─▶ Delivered ─▶ Completed
  Collect-it-myself:                      Ready for pickup ─▶ Collected ───────────────▶ Completed

SIDE PATHS
  Awaiting payment ─▶ Abandoned
  Paid, Accepted or Ready ─▶ Cancelled
  Ready ─▶ Awaiting buyer's decision ─▶ Ready (paid the difference, or switched to pickup)  or  Cancelled
  In delivery ─▶ Delivery failed ─▶ In delivery (retry)  or  Returned to seller ─▶ Resolved
  In delivery ─▶ Disputed ("It hasn't arrived")
  Delivered, Collected or Completed (inside the window) ─▶ Disputed ─▶ Resolved
  Completed ─▶ Return requested ─▶ Return in transit ─▶ Returned and refunded
                      └─▶ Return closed (refused by Operations, or lapsed)

END STATES: Abandoned · Cancelled · Completed · Resolved · Returned and refunded · Return closed.  Every Cancelled and Resolved carries its refund (9.9).
```

| From ─▶ To | Who or what causes it | Guard | Timer and side effects |
|---|---|---|---|
| — ─▶ **Awaiting payment** | Buyer taps Pay | Price, stock, seller's limit, card rules (9.4), offer validity all re-checked. One active payment attempt per checkout. | Stock and the seller's limit are reserved. Released after 30 minutes, or when the payment company's session ends, whichever is sooner. |
| Awaiting payment ─▶ **Paid** | Earth confirms with the payment company | Never from the buyer's browser. The payment company's message is a hint: Earth re-reads the payment by API before moving. Processed once however many times it is sent. With no message, Earth checks by itself at 1, 5, 15 and 60 minutes. | Seller alerted: an on-screen banner always, sound and vibration where the phone allows, push where supported, and WhatsApp at once. The buyer sees "Confirming your payment" for up to 60 minutes, then a receipt or "We couldn't confirm this payment. You have not been charged, or you will be refunded automatically." |
| Awaiting payment ─▶ **Abandoned** | Timer | — | Reservation released. |
| *Late payment on an abandoned attempt* | Payment company (bank transfers can be slow; this is why the buyer's screen waits 60 minutes though the reservation lasts 30) | — | Earth tries to reserve stock again. If it can, the order becomes Paid. If not, full automatic refund, and Earth bears the fee. |
| Paid ─▶ **Accepted** | Seller Owner, Manager or Staff | — | **The seller has 4 opening hours to accept, or 1 opening hour for fresh goods. Only the store's opening hours count**, so an order at 1 am punishes nobody. |
| Paid ─▶ **Cancelled** | Seller declines; or the opening-hours timer runs out; or the buyer cancels; or 24 hours pass | — | Automatic full refund. A decline or an opening-hours timeout counts against the seller's completion rate. A 24-hour cancellation while the store was closed throughout does not. |
| Accepted ─▶ **Ready for pickup** | Seller | — | Due by the product's "ready within X hours". 2 opening hours late: the seller is reminded, and the buyer may cancel free. The delivery is booked at Ready (8.4). For collect-it-myself, the buyer gets a 4-digit code and the pickup address. |
| Accepted or Ready ─▶ **Cancelled** (buyer asks) | Buyer requests. Seller Owner or Manager agrees, or does not answer in 2 opening hours. | Not after pickup | Refund, less any provider cancellation charge (9.8). |
| Accepted or Ready ─▶ **Cancelled** (seller cannot fulfil) | Seller Owner or Manager, with a reason | Not after pickup | Full refund. Payment fee to seller debt. Counts against completion rate. |
| Ready ─▶ **Awaiting buyer's decision** | Earth, when the delivery cannot be booked at the paid price (8.3 rule 6) or no rider is found (8.4) | — | 30 minutes. The buyer is alerted at once. The seller sees "On hold: waiting for the buyer". |
| Awaiting buyer's decision ─▶ **Ready for pickup** | Buyer pays the difference (top-up confirmed), and Earth books again. Or the buyer switches to pickup, where the seller allows it, and gets a collection code; the delivery charge is refunded. | — | — |
| Awaiting buyer's decision ─▶ *30 more minutes* | Buyer, once | — | Earth tries the providers again during the extension. |
| Awaiting buyer's decision ─▶ **Cancelled** | Buyer cancels, or the timer runs out | — | Full refund. Never counts against the seller. |
| Ready ─▶ **In delivery** | Logistics provider: picked up | — | Live status: rider assigned, picked up, on the way, nearby. |
| Ready ─▶ **Collected** | Seller enters the buyer's code | Code must match. For a live animal, the seller must first enter the veterinary movement permit number (7.1). The same guard applies before a rider's pickup. | Same effect as Delivered. **If the buyer has not collected within 24 hours (end of the day for fresh goods), the order goes to Operations**, who contact the buyer and decide: extend by a day, or cancel under 9.9. |
| In delivery ─▶ **Delivered** | Provider, with the buyer's code or a photo | — | Buyer asked: "Everything all right?" Confirm, or Report a problem. |
| In delivery ─▶ **Delivery failed** | Provider | — | Section 8.4. |
| Delivery failed ─▶ **In delivery** | Provider's retry, or a paid further attempt | — | — |
| Delivery failed ─▶ **Returned to seller** | Provider, after 48 hours unresolved | — | Goes to Operations. |
| Returned to seller ─▶ **Resolved** | Operations | A reason is required | Refund decided by who caused the failure (9.9). |
| In delivery ─▶ **Disputed** | Buyer taps "It hasn't arrived" | Shown 3 hours after the estimate for fresh goods, 24 hours otherwise. No photos needed. | Order flagged to Operations at the same moment. |
| Delivered or Collected ─▶ **Completed** | Buyer confirms, or the timer | — | **The problem window is 48 hours after delivery, 24 for fresh goods. Tapping Confirm does not close it early.** Under **[D4]**, the seller's held share is released when the window closes. |
| Delivered, Collected or Completed (inside the window) ─▶ **Disputed** | Buyer | Photos required, except for "not arrived" | Section 12.3. Under **[D4]**, the held share stays held. |
| Disputed ─▶ **Resolved** | The two parties agree, or Operations decides | — | Section 12.3. Under **[D4]**, the held share is released at this point, less any refund. |
| Ready (collect-it-myself), never collected ─▶ **Cancelled** | Operations, after contacting the buyer | — | Refund under 9.9. |
| Completed ─▶ **Return requested** | Buyer, goods that do not spoil, within 7 days. The form asks which items, why, and for photos. | — | Seller Owner or Manager has 48 hours to approve or refuse. Refusal or silence sends it to Operations, who approve it or close it. |
| Return requested ─▶ **Return closed** | Operations refuses; or the buyer does not book the return within 3 days of approval | A reason is required | The buyer is told why. No refund. |
| Return requested ─▶ **Return in transit** | Buyer books return delivery from the same options, at their own cost | Within 3 days of approval, or the request lapses | — |
| Return in transit ─▶ **Returned and refunded** | Seller confirms receipt | — | 48 hours after the return is delivered with no word from the seller, it is confirmed automatically. Goods price refunded (9.9). If the seller says the goods came back damaged or incomplete, it goes to Operations as a dispute (12.3). |
| Any paid state, **seller suspended** | Operations | — | The order continues if the seller can fulfil it. Otherwise Operations cancels and refunds. |

"Completed" closes the order for the buyer and seller. It does not end Earth's risk: card reversals can arrive months later, which is why seller debt has its own ageing rule (9.4).

Both parties can rate each other once an order is Completed: one to five stars and an optional sentence. Store ratings are public. A buyer's ratings are visible to sellers only.

### 12.2 Bulk agreement record (phase 3, subject to 11.4)

An accepted bulk offer creates a shared checklist. Earth does not execute the contract or move money.

- **It is a checklist, not a fixed sequence.** Milestones are generated from the agreed terms. Payment by letter of credit, part payment before shipment, and payment after inspection each produce different milestones in a different order.
- Each milestone is confirmed by the party responsible. Payment shows "sent" by the buyer and "received" by the seller separately, and the screen states that Earth cannot see the payment.
- The record lists the documents this commodity and destination require, and which are in.
- **Closing:** both parties confirm final quantity and value. If their figures differ, the record shows "Figures don't match" with both values, and stays open until they agree or either party marks it "Closed without agreement on value".
- **Lapse:** a record with no activity for 60 days asks both parties whether it is still live. Records with a shipment in progress never lapse.
- Commercial disputes on bulk contracts are between the parties. Earth provides the record and a fraud report route, and does not arbitrate.

### 12.3 Disputes (Stores lane)

Earth does not hold the money, so a decision leads to a **refund through the payment company**: from the seller's held share under **[D4]**, otherwise from Earth's balance and recorded as seller debt where the seller is at fault (9.9).

```
Opened by the buyer (with photos) ─▶ Seller responds (within 24 hours) ─▶ They agree ─▶ Resolved
                                          └─▶ No agreement, or no response ─▶ Operations reviews ─▶ Decision ─▶ Resolved
```

- The buyer chooses what is wrong (not arrived, wrong item, short quantity, spoiled or damaged, other) and what they want: a full refund, or a part refund with an amount. Replacements are not offered in phase 1. The buyer can simply buy again.
- **The seller's response screen** shows the claim, the photos and three buttons: Agree · Offer a different amount · Disagree, with a reason and their own photos. Only an Owner or Manager can respond.
- **A different amount** goes back to the buyer as: Offered ─▶ Accepted (Resolved), or Rejected (to Operations), or no answer in 24 hours (to Operations).
- An agreed refund is paid at once, unless the seller has already been paid or it is over 20,000 naira. Then the dispute shows **"Agreed, awaiting Earth's approval"** to both parties until Operations approves it (9.4), within 1 working day.
- Evidence gathered automatically: order, product as sold, delivery events and proof, and the conversation (access allowed under 10.7).
- Decisions: full refund, part refund, no refund. Carrier damage becomes an insurance claim through the aggregator. Who bears what is in 9.9.
- Targets: Operations' first response within 4 working hours, decision within 3 working days.
- A store whose disputes exceed 5% of its orders over its last 50 *working guess* is reviewed, and may have its limit lowered or be suspended.

### 12.4 Notifications

Push notifications work on Android. On iPhones they work only after the user adds Earth to the home screen. So **WhatsApp or SMS is the dependable channel**, and for a seller's new order it is sent at once, not after a delay.

| Event | In the app, live | Push, where supported | WhatsApp or SMS | Email |
|---|---|---|---|---|
| New message | Y | Y | After 10 minutes unread (user can change or turn off). No message text. | Optional daily digest |
| Offer received, replaced, accepted, about to expire | Y | Y | Y | — |
| New order, to the seller | Y, with sound, vibration and banner | Y | **At once** | Y |
| Order status, to the buyer | Y | Y | Accepted, out for delivery, delivered | Receipt; delivered |
| **Needs the buyer now:** awaiting your decision, a top-up requested, delivery failed, ready to collect | Y | Y | **At once** | — |
| "Tell me when it's back": product restocked | Y | Y | — | — |
| Verification decision | Y | Y | Y | Y |
| Licence or verification expiring | Y | Y | Y | Y |
| Payout failed; seller debt created | Y | Y | Y | Y |
| Dispute opened, answered or decided | Y | Y | Y | Y |
| Waitlist and product news | — | — | With consent, at most weekly | With consent |

Users control each channel per group of events, except security and money events, which always reach them on at least one channel. Quiet hours apply to everything except new orders, which the seller may let through.

### 12.5 Admin console

| Area | What staff do there |
|---|---|
| **Waitlist** (phase 0) | Segments, export, batch invitations. |
| **Verification queue** | Section 6.4. Documents beside the identity company's results. Decision with reason. Appeals go to a different officer. |
| **Listing review** | Products held by automatic screening, and a daily sample. Unpublish with a reason the seller sees. |
| **Requests** (phase 2) | Buyer requests to verified sellers: review, send on, or return with a reason. |
| **Reports and disputes** | One screen: order, product as sold, delivery events, proof, conversation where allowed, decision, refund. |
| **Reversals** | Each claim with its deadline counting down, and the evidence pack. |
| **Users and organisations** | Search, tier and history, suspend and reinstate with a reason, link duplicates. |
| **Catalogue** | Categories, unit presets with default weights, prohibited-item rules. Phase 3: commodity specifications and document types. |
| **Money** (Finance) | Commission by category, limits, reconciliation against the payment company to the kobo, seller debts, refund reserve, price-drift cost. |
| **Logistics** (Finance) | Providers on and off, margin rules, wallet balances and alarms, failure rates by provider. Phase 3: freight partners and quote entry. |
| **Audit log** | Every staff action: who, what, when, before and after. Nobody can edit or delete it. |
| **Founder view** | Section 4.6. |

Staff sign in with two-step verification. Every opening of an identity document or a private conversation is logged.

### 12.6 Store health measures

Shown on the store page and on the seller's Performance screen, each with a "how this is calculated" link.

| Measure | Calculation |
|---|---|
| **Reply time** | Median time from a buyer's first message in a quiet conversation to the store's first reply, counting opening hours only, over the last 30 days. Shown as "usually replies within an hour" and similar bands. Needs at least 5 conversations, otherwise "New store". |
| **Completion rate** | Completed orders divided by paid orders, over the last 90 days. Declines, acceptance timeouts and "cannot fulfil" cancellations count against it. Buyer cancellations and closed-store timeouts do not. |
| **Dispute rate** | Orders with a dispute decided against the store, divided by completed orders, over the last 50 orders. |
| **Rating** | Average stars over the last 12 months, with the count. |

---

## 13. Screen inventory

**P0** waitlist · **P1** stores in one city · **P2** verified profiles and buyer requests · **P3** Bulk lane · **P4** global, gold listings. The last column points to where the behaviour is specified. Every screen also follows section 14.

### 13.1 Public

| # | Screen | Phase | Specified in |
|---|---|---|---|
| 1 | Home | Live | Wording changes: 11.3 |
| 2 | Waitlist: step 1 · enter code · step 2 · confirmation | P0 | 5.2, 5.4 |
| 3 | Referral landing ("Bola invited you") | P0 | 5.4 |
| 4 | Unsubscribe confirmation | P0 | 5.2 |
| 5 | Category browse | P1 | 7.3 |
| 6 | Search results and filter sheet | P1 | 7.3 |
| 7 | Store page: badge, reply time, completion rate, ratings, products, save | P1 | 7.3, 12.6 |
| 8 | Product page, including "Tell me when it's back" and "Temporarily unavailable" | P1 | 7.1, 7.2 |
| 9 | What a badge means (opens from any badge) | P1 | 6.3 |
| 10 | How ranking works · Fees · Returns and refunds · Prohibited items · How we handle your messages | P1 | 7.3, 9.2 and 9.3, 9.8, 11.1, 10.7 |
| 11 | Sign up · Sign in · Enter code · Second proof · Invitation to join an organisation | P1 | 6.1 |
| 12 | Terms · Seller terms · Privacy | P1 | 11.5 |
| 13 | Verified seller profile, with "Send a request" | P2 | 7.4 |
| 14 | Bulk listing page | P3 | 7.5 |

### 13.2 Buyer

| # | Screen | Phase | Specified in |
|---|---|---|---|
| 15 | Onboarding: name, country, city, language, intent | P1 | 6.1 |
| 16 | Buyer home | P1 | 4.6 |
| 17 | Cart (one per store) and carts list | P1 | 7.3, 9.2 |
| 18 | Checkout: address · delivery options · review · pay | P1 | 8.3, 14.2 |
| 19 | Payment result: confirmed · confirming · failed | P1 | 12.1, 14.2 |
| 20 | Orders list | P1 | 7.3 |
| 21 | Order detail: live status, delivery or collection code, confirm, report a problem, "It hasn't arrived", awaiting your decision (with top-up), request cancellation, buy again, rate | P1 | 12.1, 14.2 |
| 22 | Open a dispute · Dispute detail | P1 | 12.3 |
| 23 | Request a return · Return detail | P1 | 12.1 |
| 24 | Refund status | P1 | 9.4 |
| 25 | Saved stores and products | P1 | 7.3 |
| 26 | Addresses | P1 | 8.3 |
| 27 | Buyer identity verification: same steps and states as a seller's Tier 1 | P2 | 6.3, 6.4 |
| 28 | Send a request · My requests | P2 | 7.4 |
| 29 | Enquiries · Requests for quotation · Responses | P3 | 7.5 |
| 30 | Agreement record | P3 | 12.2 |
| 31 | Buying organisation: set-up · members · documents received | P3 | 4.2 |

### 13.3 Seller

| # | Screen | Phase | Specified in |
|---|---|---|---|
| 32 | Seller set-up, six steps | P1 | 6.2 |
| 33 | Store overview | P1 | 4.6 |
| 34 | Orders to fulfil (the Staff view, with no money) | P1 | 4.6 |
| 35 | Products list with quick price and stock edit · add or edit product | P1 | 7.1, 7.2 |
| 36 | Orders board · order detail: accept, decline, mark ready, enter collection code, answer a cancellation request | P1 | 12.1 |
| 37 | Respond to a dispute | P1 | 12.3 |
| 38 | Approve a return · confirm return received | P1 | 12.1 |
| 39 | Verification centre: tiers, checklist, upload, status, changes requested, appeal, renew | P1 (licences P2) | 6.3, 6.4 |
| 40 | Payout account, with the name-mismatch state and the 48-hour hold · payout history · commission statement (each order's ledger lines from 9.2, with monthly totals and a download) · **seller debt** | P1 | 6.2, 9.2, 9.4 |
| 41 | Team: members, roles, invitations, offer limits · transfer ownership · close the organisation | P1 | 4.3, 6.1 |
| 42 | Store settings: profile, pickup addresses, opening hours, "buyers can collect from me", delivery settings override | P1 | 6.2, 7.1 |
| 43 | Performance: reply time, completion rate, disputes, ratings, and how each is calculated | P1 | 12.6 |
| 44 | Account suspended · Account under review (sanctions freeze) · Respond | P1 | 6.4 |
| 45 | Requests received: accept or decline | P2 | 7.4 |
| 46 | Document store | P2 | 10.4 |
| 47 | Bulk listings · add or edit · enquiries by stage · quotation requests that match me | P3 | 7.5 |
| 48 | Subscription and billing | P3 | 9.6, **[D13]** |

### 13.4 Shared

| # | Screen | Phase | Specified in |
|---|---|---|---|
| 49 | Conversations list, newest activity first, with unread counts and the pinned subject. Filters: unread, has an open order (requests, from P2) | P1 | 10.1 |
| 50 | Conversation: pinned subject, "Orders in this chat", messages, + menu, pickers, product card, order card, delivery card, offer card, voice note | P1 | 10, 14.2 |
| 51 | Price offer form · accept confirmation | P1 | 10.3 |
| 52a | Share a document · watermarked viewer · add a colleague | P2 | 10.2, 10.4 |
| 52b | Bulk offer form · document request · freight request · order an inspection (either party). **Inspection ordering is to be specified with phase 3**: payer, partner flow and states are not yet defined. | P3 | 10.3, 10.4, 8.5 |
| 53 | Notifications centre · notification settings | P1 | 12.4 |
| 54 | Account: profile, sign-in methods, second proof, language, data export, delete account | P1 | 6.1, 11.5 |
| 55 | Buying and Selling switch · organisation switcher | P1 | 4.5 |
| 56 | Report a listing, person or message | P1 | 10.7 |
| 57 | Rate an order | P1 | 12.1 |

### 13.5 Earth staff

| # | Screen | Phase | Specified in |
|---|---|---|---|
| 58 | Staff sign-in with two-step verification | P0 | 12.5 |
| 59 | Waitlist: segments, export, invite | P0 | 5.3 |
| 60 | Founder view | P0, then P1 | 4.6 |
| 61 | Queues home | P1 | 4.6 |
| 62 | Verification: queue · case · decision · appeal | P1 | 6.4 |
| 63 | Listing review: queue · case | P1 | 7.2 |
| 64 | Reports · disputes · case with refund action | P1 | 12.3 |
| 65 | Reversals: queue with deadline · evidence pack | P1 | 9.4 |
| 66 | Users and organisations: search, detail, suspend, reinstate, link duplicates · sanctions-review queue (super admin) | P1 | 6.4, 12.5 |
| 67 | Catalogue | P1 | 12.5 |
| 68 | Money: rates, limits, reconciliation, seller debts, reserve | P1 | 9 |
| 69 | Logistics: providers, margins, wallets, failure rates | P1 | 8 |
| 70 | Audit log · staff accounts and roles | P1 | 12.5 |
| 71 | Requests review | P2 | 7.4 |
| 72 | Freight partners and quote entry | P3 | 8.5 |

Phase 1 is about 50 rows of this inventory, and many rows are several screens. That is a large design job, and section 17 sizes it honestly.

---

## 14. States

### 14.1 Rules for every screen

| State | Rule |
|---|---|
| **First load** | The page's skeleton, in its final layout, within 1 second. Content replaces it in place with no jump. Never a blank page or a lone spinner. |
| **Refreshing** | Keep showing what we have, with a thin progress line. Never blank a screen to reload it. |
| **Empty, first time** | Say what will appear here and give the one action that fills it. |
| **Empty, after filtering** | "Nothing matches these filters", and a clear-filters button. |
| **Partial** | If one part fails, the rest works, and the failed part has its own retry. |
| **Error the user can fix** | Beside the field, in plain words, with what to do. Never just "invalid". |
| **Error that is ours** | Apology, retry, a reference code. Nothing typed is lost. |
| **Error that is someone else's** | Name it. "The payment company isn't responding. You have not been charged." |
| **Offline** | A slim banner. Loaded content stays readable. Actions that can wait are queued with a clock. Actions that cannot are disabled, with the reason. |
| **Slow connection** | After 4 seconds, offer "Load without photos". A data-saver setting makes it permanent. |
| **Not allowed** | Say why, and what would change it. |
| **Waiting on verification** | What is pending, since when, and what they can do meanwhile. |
| **Success** | Confirm in place and say what happens next. Full-screen success only for payments and approvals. |
| **Destructive action** | Name the thing. Where undo is offered instead of a confirmation, it stays until the user leaves the screen or 30 seconds pass, and is reachable by keyboard and screen reader. |
| **Changed underneath you** | Show the change live, highlight it, and announce it in words to screen readers. Never let someone act on a stale number. |
| **Timers** | Every limit that can lapse while the user is on the screen warns 2 minutes before, and offers "I need more time" once. |
| **Session ended** | Sign in again, and return to exactly where they were with what they typed. |

**Accessibility.** Every screen meets the recognised AA standard. The warm palette's small grey text must be checked for contrast. Every action works with a keyboard and a screen reader. Touch targets are at least 44 pixels. Status is never colour alone. Reduced motion is respected. Alerts are never sound alone. Location and selfie steps always have another route (typed address; manual review).

**Language.** English and Nigerian Pidgin at launch. The main language of the launch city (Yoruba for Lagos, Hausa for Kano or Kaduna) follows as the first addition, and is the language item that 17.4 lists as cuttable. Translation is a cost in 17.3. All text goes through a translation layer from day one. Icons and pictures carry meaning wherever they can, so reading is not a gate.

### 14.2 The screens where states matter most

**Checkout (screen 18)**

| Situation | What the buyer sees |
|---|---|
| Quotes arriving | Options appear one by one. "Finding delivery companies…" for at most 10 seconds. |
| One quote only | It is shown, selected, with "Only one company can take this right now." |
| No quotes | 8.3 rule 5. |
| A quote changed while they were looking | The new price, highlighted: "This price changed from 1,500 to 1,650." They must tap to accept it. |
| A product's price or stock changed | Old and new shown in the review step. Out-of-stock items are removed with a notice. Cannot pay until acknowledged. |
| Seller became unavailable (limit, paused, suspended) | "This store can't take orders right now. Your cart is saved." |
| Offer-price checkout, offer expired | "This offer expired 5 minutes ago." Button: "Ask Bola Farms to renew it", which posts in the conversation. |
| Below the store minimum | "Add 1,200 naira more to order from this store." |

**Payment result (screen 19)**

| Situation | What the buyer sees |
|---|---|
| Confirmed | Receipt, order status, "Message the seller". |
| Confirming (bank transfer, slow network) | "We're confirming your payment. This can take a few minutes. You can close this page. We'll message you." Up to 60 minutes. |
| Failed | The payment company's reason in plain words. "You have not been charged." Retry with the same or another method. |
| Could not confirm after 60 minutes | 12.1. |
| Paid twice by mistake | The second payment is refunded automatically, and the buyer is told. |

**Order detail (screen 21)**

| Situation | What the buyer sees |
|---|---|
| Waiting for the seller | "Bola Farms has until 2:15 pm to accept." Cancel button. |
| Seller did not accept in time | "Bola Farms didn't respond, so we cancelled this order. Your refund of 11,500 is on its way." Link to refund status. Similar stores suggested. |
| No rider found | The same screen as "Awaiting your decision" below. |
| In delivery | Status line, rider's first name and vehicle where the provider shares them, arrival estimate, delivery code. |
| Late | After the estimate: "This is taking longer than expected." Then the "It hasn't arrived" button: 3 hours after the estimate for fresh goods, 24 hours otherwise. |
| Awaiting your decision | "We couldn't book your delivery at the price you paid." The reason, a 30-minute countdown, and the choices: Pay 350 more · Collect it myself · Give me 30 more minutes · Cancel and refund. |
| Top-up confirming or failed | Same wording as the payment result screen. The countdown keeps running and says so. |
| Delivery failed | What the rider reported, what happens next, and any charge with who pays it and why. |
| Returned to seller | "Your order went back to Bola Farms. We're deciding your refund and will tell you by [time]." |
| Ready to collect | Address, opening hours, collection code, and the time by which to collect. |
| Not collected in time | "You haven't collected this order. We'll call you." |
| Disputed | The claim, the seller's answer when it comes, the deadline for each side, and "Agreed, awaiting Earth's approval" where it applies. |
| Return requested, in transit, refunded, closed | Status, the next step and who must take it, and the deadline. |
| Delivered | "Everything all right?" Confirm, or Report a problem, with the time the window closes. |

**Conversation (screen 50)**

| Situation | What the user sees |
|---|---|
| Empty | "Say hello to Bola Farms. They usually reply within an hour." Suggested first messages as buttons. |
| Offline | Banner. New messages queue with a clock. Offer button disabled: "You need a connection to send an offer." |
| Message failed | Red mark, "Tap to retry". Never silently dropped. |
| You were removed | "You no longer have access to this conversation." Content cleared from the phone. |
| The other party is suspended | "This store is temporarily unavailable." You can still read the history. |
| A phone number was masked | Notice to the sender only (10.7). |
| Scam warning | A banner on the message, with Report. |

**Offer card**

| Situation | Card shows |
|---|---|
| Open | Terms, time left, buttons by role: Accept · Decline · Send a different offer (other side); Withdraw (sender). |
| Under an hour left | Time left, highlighted. |
| Accepted | "Accepted by Ngozi, 2:04 pm." Buyer's button: "Check out at this price". |
| Replaced, declined, withdrawn, expired | Greyed, with the outcome and time. No buttons. |
| Not allowed (Staff over their limit) | "Only the owner or a manager can accept offers above 50,000." |

**Verification centre (screen 39):** each tier as a card with its status from 6.4, the decision time promised, and the next action. Changes requested expands to the failed items only.

**Waitlist:** 5.4.

---

## 15. Technical requirements

This section sets requirements and measurable targets. How the server meets them is the backend lead's decision.

### 15.1 Shape of the front end

The engineering lead asked for Vite and React for the application, Next.js for the public website, and Redux Toolkit. We agree on the application, and recommend two adjustments.

1. **Do not rebuild the public website in Next.js.** It is already built and live on Vite and React (TanStack Start, which renders on the server). A rebuild gives users nothing.
2. **Public store and product pages must be rendered on the server.** When a link is pasted into WhatsApp, WhatsApp reads the page once without running any code. A plain single-page application gives it an empty page and no preview. Search engines cope better, but slowly. These pages therefore live with the public website.

| Surface | Address | Built with | Why |
|---|---|---|---|
| Website and public pages: home, waitlist, browse, search, store, product, profiles, policies | `earth…/` | The existing codebase, server-rendered | Link previews, search, fast first view |
| The application: everything after sign-in | `earth…/app` | Vite, React, TypeScript single-page application. Redux Toolkit with RTK Query. Installable, with an offline outbox. | As the engineering lead asked |
| Admin console | `admin.earth…`, a separate address | Same stack, separate build, **its own sign-in** | Staff code never ships to customers, and a staff session can never be reached from the public site |

**Why one address for the public pages and the application.** A buyer moves between them constantly: search, store and product pages are public, while Home, the cart, checkout, orders and messages are the application. On one address they share a sign-in with no cross-site complications, one installed app covers both, and a WhatsApp link opens the same place the installed app lives.

**Who owns what:**

- **Buyer Home is an application screen**, signed in and live. The Search tab opens the public search page. Search, store and product pages are built once, in the server-rendered codebase.
- Moving between a public page and the application is an ordinary page load on the same address. The public pages show the same bottom navigation, so it feels like one product.
- Public pages are cached without any personal content. The signed-in touches on them (cart count, saved hearts, the account menu) are filled in by the browser after the page loads, so caching and sign-in never conflict.
- The server-rendered site owns the web app manifest and the offline worker for the whole address. The application's files are one part of what that worker caches.
- The live connection belongs to the application. It closes when the buyer moves to a public page and reconnects, with its cursor, when they come back. The offline outbox lives in the browser's storage for the address, so it survives the move.

**What this requires, so it does not cause bugs later:**

- The customer session is a secure cookie tied to that one address only. Every request that changes something carries an anti-forgery token, and the server checks where the request came from. The live connection checks its origin the same way. The admin console has its own cookie, tied only to its own address.
- **iPhone limits, stated honestly.** An app added to the iPhone home screen does not share its sign-in with Safari. A WhatsApp link opens in Safari, where the buyer may need to sign in once. Push notifications on iPhone work only in the installed app. This is why WhatsApp is the dependable alert channel (12.4).
- **One live connection per signed-in user**, carrying every kind of event, managed in one place in the application. RTK Query's streaming updates are only a way to patch data a screen has already loaded. They do not reconnect, order or replay anything. Those come from section 10.6's running numbers, plus a per-user event cursor. When a gap is detected, the affected data is marked stale and refetched. A screen that was not open simply loads fresh when opened.
- **Public pages are not live.** They are cached briefly and refresh when opened or returned to. Live price and stock apply inside the application: the cart, checkout, and product cards in conversations. The authoritative check is at "Add to cart" and at payment (7.3).
- Where a network blocks live connections, the application falls back to checking every 10 seconds, and says "Live updates are limited on this network".
- The server publishes two typed contracts: the API description, and a **versioned list of live events**. The front end's types are generated from both.

### 15.2 "Real time", made measurable

Measured on Earth's own systems, at the 95th percentile. What a user's phone network adds is measured separately by sampling, and cannot be promised.

| What | Target, inside Earth's systems |
|---|---|
| Message received by the server to published to the recipient's connection | Under 150 ms |
| Offer sent, replaced, accepted | Under 300 ms, and never shown as accepted before the server confirms |
| Payment confirmed by the payment company to the order on the seller's screen | Under 2 s |
| Delivery status received to shown | Under 2 s |
| Price or stock change to carts, checkout and product cards in the application | Under 2 s |
| Delivery quotes | As they arrive, cut off at 10 s **[U16]** |
| Reconnection | Automatic. Nothing lost, nothing shown twice. |

Launch runs in one region. Cross-continent speed is measured, not promised, until there are users to justify a second region.

**Deliberately not real time:** search (up to 60 s behind), dashboards (5 minutes; finance hourly), payouts (the payment company's schedule), reference exchange rates (hourly).

### 15.3 "Scalable", made testable

The honest requirement: **growth must need more servers, never a rewrite.** That is achieved by rules, not by a target number of users. These are requirements on the outcome. How they are met is the backend lead's design.

- Application servers hold no user state in memory.
- Live connections run on their own tier, with a message bus between servers.
- **Data is grouped so that each part can grow independently: by conversation, and by seller organisation.** Products, stock, orders, the seller's limit and its reservations all belong to the seller organisation, so starting a payment (reserve stock, reserve the limit, create the order) is one transaction inside one group. Anything that crosses groups, such as posting an order card into a conversation, is a follow-up step driven by the outbox, never a shared transaction.
- A change that must notify someone is written to the database and to an outbox in one transaction, then published at least once. Every receiver ignores an event it has already handled.
- Messages from payment and logistics companies are verified, stored, treated as hints (the true state is re-read from the company), and never move a status backwards.
- Every request that creates something carries a key from the device. The same key with the same content returns the first result. The same key with different content is refused. Keys are kept for 24 hours.
- Search runs on its own index, never on the main database.
- Photos and documents live in object storage. Photos are served through a content delivery network in several sizes. Documents are private (10.4).
- Slow work runs in background queues.
- Money is stored as whole kobo or cents with a currency code, with a tax line on every ledger entry.
- Payment and logistics companies sit behind internal interfaces.

**Sizing for launch:** 5,000 users, 500 connections at once, 100 orders a day, in one city. Load-tested at five times that before opening. The numbers are re-set before each new city.

### 15.4 Access changes take effect at once

When a member is removed, a role is lowered, an account is suspended or frozen, or a user signs out everywhere:

- A revocation event is published. The connection tier drops that user's subscriptions within 5 seconds, and re-checks every subscription whenever a connection is re-established.
- Queued outbox messages are re-checked when they send, and refused visibly.
- Document links are useless outside the session that requested them, and last 60 seconds.
- The application clears that organisation's data from the phone when it receives the revocation.

### 15.5 Performance on the reference phone

A low-cost Android phone. Targets are given for slow 4G and for 3G, because transferring 200 KB on 3G takes about 4 seconds by itself.

| Measure | Target |
|---|---|
| Public product or store page, main content visible | Under 2.5 s on slow 4G (about 1.5 Mbps). Under 5 s on 3G. |
| Application, first visit to usable | Under 5 s on slow 4G, under 8 s on 3G. Later visits under 2 s on either. |
| Code downloaded before the first screen | Under 200 KB compressed. Maps, the camera and the offer form load only when used. |
| Images | Modern formats, a blurred placeholder, card images at most 30 KB, main photos at most 120 KB on slow connections, compressed on the phone before upload. |
| Data-saver mode | No automatic images. Everything still works. |

Context: Konga's installable web application used 92% less data on first load than its native app. Jumia's raised conversion by 33%. USSD use in Nigeria fell about 60% in a year, so we do not build for it.

### 15.6 Reliability and security

Two levels, because a small team cannot honestly promise the second on day one.

| Area | At launch | Before a second city |
|---|---|---|
| Availability of Earth's own systems | 99.5% a month | 99.9% |
| When a payment or logistics company is down | Checkout says so plainly and keeps the cart. Orders already paid continue. | Automatic switch to the second provider |
| Data safety | Daily backups with point-in-time recovery. Restore tested once before launch. | At most 5 minutes of data lost, 1 hour to restore, tested every quarter |
| Who is on call | One named engineer, and one Operations person for reversals, every day | A rota |
| Tracing | Every request traceable through Earth's systems to the provider call | Extended to the phone |

Always, from day one:

- Permissions are enforced on the server for every request. Hiding a button is never the control.
- Identity documents and licences are encrypted with separate keys. Earth stores the identity company's result and reference, not the raw identity number, wherever the company allows.
- Card details never touch Earth's servers.
- Uploads are checked for type and size, scanned for malware, and photos are stripped of location data.
- Rate limits per user, device and network on sign-up, codes, messages, requests and search.
- The one-time-code and sensitive-action rules in 6.1.
- Staff actions and all offer, document and order events go to an append-only log.
- Alarms: payment confirmations failing, a reversal claim, a provider erroring, a wallet or the refund reserve running low, connections dropping, queues backing up, SMS spending spiking.
- Automated tests for every state table in this document, including each same-second race it names. Provider integrations tested in the providers' test systems.

---

## 16. User stories

### 16.1 One week on Earth

Every step in this story follows the rules in this document. The phase each part belongs to is marked.

**Monday, Ikorodu (phase 1).** Bola's farm on the edge of Lagos has tomatoes ripening and a middleman offering a third of the city price. Her nephew sends a WhatsApp link with a picture of a field on it. She opens Earth, types her number, enters the code. It asks what she sells, in pictures. She taps vegetables and eggs, names the store "Bola Farms, Ikorodu", types the street and the landmark ("after the second filling station"), and taps "Use my current location". She photographs a basket. The form suggests "basket, about 20 kg". She sets a price, says they were picked this morning, and saves.

A checklist shows two things between her and customers. **Prove who you are:** she types her identity number and takes a selfie. The first try fails in the dim packing shed. The screen says to find better light. The second works, and a badge appears beside her store name: *Identity verified*, with today's date. **Where you get paid:** she enters her own bank account, and Earth shows the name the bank holds. It matches. Her tomatoes are live. It took about fifteen minutes and she called nobody.

**Tuesday, Yaba (phase 1).** Ngozi runs a restaurant and loses a morning at Mile 12 twice a week. She searches tomatoes, filters to "delivers to me", and finds Bola's basket well under the market price. She taps the badge and reads what was checked. She messages: three baskets today? Bola's reply lands while Ngozi is still typing. Bola's basket is 9,000. She taps **+**, then "Make an offer": three baskets at 8,500 each, valid 24 hours. It arrives as a card, not a sentence. Ngozi accepts. The card turns green on both phones within a second and shows "Check out at this price".

Checkout asks for her address, which is inside the delivery zone, and checks that sixty kilos is within what the couriers carry. Delivery options appear as they arrive: a car this afternoon at 4,500, or a van this evening at 5,200. Both are same-day, because tomatoes are fresh. A notice says the delivery is not refrigerated. She picks the car and pays 30,000: 25,500 for the tomatoes and 4,500 for delivery. The payment company divides it there and then. Earth's commission and the delivery charge go to Earth. Bola's share is set aside for her by the payment company, to be paid to her own bank account once the order's problem window closes. Nobody at Earth held Ngozi's money. *(This is the pay-after-the-window path we recommend in D4. Without it, Bola is paid the next working day.)*

Bola's phone chimes, buzzes and shows a banner: a paid order, and she has an hour of opening time to accept. She accepts, packs, and marks it ready at two. A rider is booked at that moment. Ngozi watches the status change by itself. At the door she reads a four-digit code to the rider. Delivered. One basket is bruised, so that evening she taps "Report a problem", adds a photo and asks for 4,000 back. Bola agrees in the app. Because Bola's share is still with the payment company, most of the 4,000 comes out of it, Earth gives back its own commission and tax on that amount, and nobody owes anybody. Bola's payout arrives once the window closes, less the refund. The following Tuesday, Ngozi taps "Buy again".

**Some weeks later, Osun (phase 2).** Tunde holds a mining lease and has been burned twice by fake buyers. On Earth he becomes Identity and Business verified, uploads his mining title, and Operations checks it with the mining office. His profile now reads *Verified mineral seller · gold · licence checked*, with the date. It shows no price, no stock, and not where his mine is. Requests begin to reach him, each from a buyer Earth has verified and screened. He declines two. He accepts one, and a conversation opens between two parties who each know the other is real.

**Later, Houston (phase 3, subject to legal advice).** Daniel buys cocoa for a chocolate maker whose European customers must soon prove which plots their beans grew on. He verifies his identity, which bulk buyers must. He finds an exporter in Ondo with three dated badges and sends an enquiry. The exporter sees Daniel's verification and accepts, and a conversation opens with the listing pinned. The exporter sends a bulk offer card. Daniel wants his compliance colleague in the thread, so he types `@`, finds her under "Not in this conversation", and taps "Add to conversation". The thread records that he added her. He requests the export certificate and the farm plot locations, which arrive as document cards with every view logged. He orders an inspection from an independent firm inside the conversation, and the report arrives from the inspector, not the seller. He replaces the offer with a lower price. The old card greys out, and the exporter accepts the new one. An agreement record appears with the milestones their terms imply. Daniel pays the exporter bank to bank, as the trade always has, and marks it sent. The exporter marks it received. When the shipment lands, Daniel exports the whole record as one PDF.

Nobody at Earth packed a basket, drove a car, held a payment or signed a contract.

### 16.2 Stories and acceptance criteria

**As a** [user] **I want** [capability] **so that** [benefit]. Each criterion is a test that passes or fails. Phase in brackets.

#### Epic A. Waitlist [P0]

**US-A1.** As a visitor I want to join in under a minute so that I hear when Earth opens.
- Step 1 asks only for intent, country and city, one contact, and consent.
- I have no place and count in no total until I confirm with a code.
- Before I enter a code, the screen says the same thing whether or not my contact is already on the list.
- Offline, my details are kept on my phone and I am told to tap Send when I am connected.

**US-A2.** As someone on the waitlist I want to move up by inviting friends so that waiting is worth something.
- My place is shown within my intent and city, and names my category if I gave one.
- Each friend who joins from my link and confirms moves me up 5 places, up to 10 a day, credited 24 hours after they confirm.
- Disposable emails, internet phone numbers and email aliases earn nothing. A referral from the same device or network is held for a person to review.
- My WhatsApp share shows a preview picture and text.

**US-A3.** As staff I want to see sign-ups by segment and invite a segment in batches so that we open to the right people first.
- I can filter by intent, city, category and volume, and export.
- An invited person's onboarding is pre-filled.

**US-A4.** As the founder I want to see waitlist growth every day so that I know anticipation is building.
- Total, last 24 hours, last 7 days, by intent and by city, and the top referrers.

#### Epic B. Accounts [P1]

**US-B1.** As a new user I want to sign up with my phone or email and a code so that I need no password.
- Six digits, valid 10 minutes. Five wrong tries cancels the code, and I must ask for a new one.
- At most 3 codes an hour and 10 a day for my contact. Beyond that I am told when I can try again.
- The response is identical whether or not an account exists.

**US-B2.** As a seller I want my payout account protected even if someone steals my SIM card so that my money cannot be redirected.
- An Owner signing in on a new device needs a second proof (a selfie match on a basic phone) and alerts every contact. There is no delay.
- Changing the payout account or transferring ownership needs the second proof, alerts every contact, takes effect after 48 hours unless any of them cancels, and cannot start within 48 hours of a new-device sign-in.

**US-B3.** As a user I want to say whether I am buying, selling or both so that Earth starts me in the right place.
- "Buy" lands on buyer home. "Sell" and "Both" start seller set-up. I can add the other later.
- If I do both, a Buying and Selling switch is always visible, and the application opens in the mode I last used.

**US-B4.** As a store owner I want to invite staff with a role so that they can work without seeing my money.
- I can invite by phone or email as Manager or Staff, and set a Staff member's offer limit.
- A Staff member sees product prices and offer values, and never receives order totals, commission, payouts, revenue, debt or the payout account, on any screen or in any server response.
- The invited person sees who invited them and the role, and accepts or declines.
- Removing someone ends their access within 5 seconds, including open connections and queued messages, and clears the store's data from their phone.

#### Epic C. Seller set-up and verification [P1; licences P2]

**US-C1.** As a seller I want to set up step by step and leave at any point so that I can finish later.
- Every step saves. The overview lists what is left, and each item opens its step.
- I can enter my pickup address without a map: lists, a landmark, and "Use my current location".

**US-C2.** As a seller I want identity verification to be automatic so that I can sell today.
- A clean result approves me within 2 minutes, with no human.
- If my selfie fails I am told what to try. After 3 failures a person checks it, within one working day.
- On a weak connection I can upload a still photo instead of live video.

**US-C3.** As a seller I want clear rules for my payout account so that I am not stuck.
- The bank's account name is shown to me. At Identity verified it must be my own name.
- A business account is accepted once I am Business verified. A mismatch screen offers both routes.
- My products cannot go live without a confirmed payout account.

**US-C4.** As a farmer with no registered business I want my limit to grow with my track record so that paperwork does not cap me.
- My limit on money at risk rises automatically at 10 completed orders from at least 5 different buyers and cards, and again at 50, if my disputes stay under 5%.
- A cooperative certificate is accepted for Business verified. Tiers 1 and 2 are free.

**US-C5.** As a seller asked to make changes I want to know exactly what was wrong so that I fix only that.
- Only failed items reopen, each with a plain reason and an example.
- If I am rejected I can appeal once within 14 days to a different officer, or reapply after 30 days.

**US-C6.** As Operations I want everything for a verification decision on one screen so that I decide fast and fairly.
- Oldest first, with age against the one-working-day target. Opening a case locks it to me.
- I cannot open a case for an organisation I belong to. I must choose a reason to request changes or reject.

**US-C7.** As a seller whose licence is expiring I want warnings so that nothing disappears by surprise. [P2]
- Warnings at 30, 14 and 3 days. On expiry only that licence's badge and the listings that needed it are affected.

**US-C8.** As a buyer I want to tap any badge and read what was checked, by whom and when.
- A seller with no verification shows "New seller, not yet verified".

#### Epic D. Products and discovery [P1]

**US-D1.** As a farm seller I want to list a product from my phone in under three minutes.
- I pick my unit from pictures, and its weight is suggested. I am not asked for package dimensions or vehicle types.
- Fresh categories ask when it was picked and how long it keeps.
- Photos are compressed on my phone before upload.

**US-D2.** As a seller I want to change price and stock instantly.
- Edits reach carts, checkouts and product cards in the application within 2 seconds. Public pages show them when next opened.
- Two buyers cannot both buy the last unit. The second is told before paying.

**US-D3.** As a buyer I want to find food that can reach me.
- Search tolerates misspellings and local names.
- "Delivers to me" hides products outside my delivery zone.
- Price and stock are re-checked when I add to cart and when I pay.

**US-D4.** As a buyer I want a shared link to look right on WhatsApp.
- The link shows a preview with photo, name and price, and the page opens without signing in.

**US-D5.** As a buyer I want to save stores and buy again in two taps.
- "Buy again" refills a cart at today's prices and shows any change before I pay.

**US-D6.** As a buyer I want honest messages when I cannot buy something.
- Sold out offers "Tell me when it's back". Any other reason shows "Temporarily unavailable", with no detail about the seller.

#### Epic E. Checkout and delivery [P1]

**US-E1.** As a buyer I want to choose my delivery company from live prices.
- Options appear as they arrive, for at most 10 seconds. Each shows company, vehicle, one price, and an arrival estimate. Cheapest and fastest are labelled.
- Fresh goods show same-day options only, with a notice that delivery is not refrigerated.
- With no quotes I can retry, collect it myself where allowed, message the seller, or keep my cart.

**US-E2.** As a buyer I want the price I saw to be the price I pay.
- If a quote or a product price changes while I am checking out, I see old and new and must accept before paying.
- After I pay, my delivery price never rises unless I approve it. Earth absorbs a carrier increase up to its own margin. Beyond that I have 30 minutes to pay the difference, switch to pickup or cancel.

**US-E3.** As a buyer I want my order to exist even if I close the page after paying.
- The order becomes Paid only after Earth confirms with the payment company, and only once.
- I see "Confirming your payment" for at most 60 minutes, then a receipt, or a clear message that I was not charged or will be refunded.
- A slow payment that arrives after the stock has gone is refunded automatically.

**US-E4.** As a seller I want to know the instant I have a paid order.
- On screen within 2 seconds with a banner always, sound and vibration where my phone allows, and by WhatsApp at once.
- I have 4 opening hours to accept, or 1 for fresh goods. Closed hours do not count. After that it cancels, the buyer is refunded, and it counts against me.

**US-E5.** As a seller I want delivery booked when I say the goods are ready.
- "Ready for pickup" books the buyer's chosen company. I see the rider's details when assigned.
- If no rider is found, Earth tries the next suitable option and tells both of us.

**US-E6.** As a buyer I want to follow my delivery and say so if it never comes.
- Status changes without refreshing. If the provider is silent for 30 minutes Earth asks them.
- Delivery is confirmed with my code, or a photo.
- I get an "It hasn't arrived" button 3 hours after the estimate for fresh goods, 24 hours otherwise.

**US-E7.** As a buyer I want to collect an order myself.
- I receive a 4-digit code and the pickup address. The seller enters my code to complete the handover.

**US-E8.** As Finance I want an alarm before a logistics wallet runs low.
- A provider whose wallet cannot cover a booking is not offered at checkout.

#### Epic F. Money [P1]

**US-F1.** As a seller I want my share paid straight to my own bank account.
- Each order shows what the buyer paid, Earth's commission, the tax on it, the payment fee, and what I receive.

**US-F2.** As Earth I want commission and the delivery charge taken at source.
- Every payment is for one store and one order, divided into fixed amounts calculated by Earth's server and stored as a ledger that is never recalculated.
- No customer funds enter an account Earth controls.
- The rate in force when the payment is started applies. Rounding favours the seller.

**US-F3.** As a new seller I can take orders up to a limit on money at risk so that one bad actor cannot cause a large loss.
- The limit is reserved when a payment starts and released if it is abandoned.
- I am told as I approach it, and how it lifts.

**US-F4.** As a buyer I want refunds to be automatic when the rules say I am owed one.
- Cancellation before acceptance, a seller decline and a seller timeout all refund in full.
- I can see each refund's status and expected arrival.

**US-F5.** As a seller I want to see any debt I owe Earth and how it is being repaid.
- The debt shows its reason, its order and how it was calculated (9.9). At most 30% of each later payout goes to clearing it. With no sales for 30 days I am invoiced.

**US-F6.** As Operations I want every reversal claim to raise an alarm with evidence ready.
- The claim shows its deadline. The evidence pack is built in one action.

**US-F7.** As Finance I want daily reconciliation against the payment company.
- Any order whose amounts differ is flagged. Totals match to the kobo. I am alerted if the refund reserve falls below its floor.

#### Epic G. Conversations [P1; bulk features P3]

**US-G1.** As a buyer I want one chat with each store, like WhatsApp.
- Messaging from a product opens my existing conversation with that store, with the product pinned.
- My orders appear in the thread as cards, in order.

**US-G2.** As a user on a bad connection I want my messages to send when the connection returns.
- Unsent messages show a clock, send in order, and are stored once even if sent twice.
- On reconnecting I receive everything I missed. After a long gap the conversation reloads.
- A failed message is marked and can be retried. It is never dropped silently.

**US-G3.** As a user I want every chat action to have a button.
- The + menu offers Photo, Voice note, Product, Make an offer, Location.
- Shortcuts trigger only at the start of a message or after a space, followed by a letter. "21/9" and "#1" do nothing.

**US-G4.** As a seller I want to drop one of my products into the chat.
- The picker shows only my store's products. The card shows photo, name, unit, price, stock and my badge, with "Add to cart" for the buyer.
- The card keeps the price as posted and shows "Price changed since" if it has.

**US-G5.** As either side I want to make a price offer as a card.
- Product, quantity, unit price, valid until. One open offer per product per conversation.
- A new offer closes the old one for ever. I cannot send or accept offline.
- Accepting restates the terms. If two people act at once, the server decides and both see the same result.
- Staff can make or accept only up to the limit the owner set.

**US-G6.** As a buyer I want an accepted offer to become my checkout at that price.
- Single use, mine only, until the offer expires. Stock, the seller's limit and expiry are re-checked at payment.
- If the offer expired, I can ask the seller to renew it in one tap.

**US-G7.** As a user I want to mention a colleague with `@`.
- Only people with access appear. For someone without access I see "Add to conversation" if my role allows adding. Mentioning alone never grants access.

**US-G8.** As a user I want to send a voice note.
- Up to 2 minutes. Nothing binding can be done by voice. A text box is always beside it.

**US-G9.** As a user I want to know exactly who can read my messages.
- A public page and the report screen state: not end-to-end encrypted; processed automatically; opened by staff only after a report, a dispute, a reversal or a lawful request; every access logged.
- WhatsApp and SMS alerts contain no message text unless I opt in.

**US-G10.** As a user I want to be warned when a message looks like a scam, and to report in one tap.

**US-G11.** As a bulk buyer I want to request and receive documents in the conversation. [P3]
- Type and due date. Files show "Checking this file" until scanned. Every view is logged. Links last 60 seconds and work once.
- Inspection reports ordered through Earth arrive from the inspector. Seller uploads are labelled unverified.

**US-G12.** As a seller I want to share a sensitive document as view-only and watermarked, so that copying is deterred and traceable. [P2]

**US-G13.** As either party I want to export the conversation's record as a PDF. [P3]

#### Epic H. Verified profiles and requests [P2]

**US-H1.** As a licensed seller I want a verified public profile so that serious buyers can find me without my details being exposed.
- It shows my organisation, state, commodity, and the licence badge with issuer and date. It shows no stock, price, site or contact.

**US-H2.** As a verified buyer I want to send a request to a verified seller.
- I must be Identity verified. Operations reviews my request before the seller sees it.
- I see Accepted, Declined or No response, never a reason.

**US-H4.** As either verified party I want to share my licence from my document store, and bring a colleague into the conversation.
- A share is pinned to one version, can be revoked, and every view is logged. Only an Owner or Manager can add a colleague, and the thread records it.

**US-H3.** As a verified seller I want to see who is asking before I answer.
- I see the buyer's name, country and badge. Accepting opens a conversation. No answer in 5 working days counts as declined.

#### Epic I. Bulk lane [P3, subject to the legal opinion in 11.4]

**US-I1.** As a bulk seller I want to list a commodity with its proper specification, reviewed before it goes live.
**US-I2.** As a buyer I want to enquire on a listing, and have the seller's private details shown to me only after they accept.
**US-I3.** As a buyer I want to post a request for quotation, receive up to 10 offers, and award one.
**US-I4.** As both parties I want an accepted bulk offer to become a shared checklist built from our payment and delivery terms.
- Payment shows "sent" and "received" separately, and states that Earth cannot see it.
- If our closing figures differ, the record says so and stays open.
**US-I5.** As either party I want to request freight quotes and order an independent inspection inside the conversation.

#### Epic J. Disputes, returns and safety [P1]

**US-J1.** As a buyer I want to report a problem with photos within the window, even if I already tapped Confirm.
- 48 hours after delivery, 24 for fresh goods, shown as a countdown.

**US-J2.** As a seller Owner or Manager I want to answer a dispute: agree, offer a different amount, or disagree with my own photos, within 24 hours.

**US-J3.** As Operations I want the order, product as sold, delivery proof and conversation on one screen so that I can decide without asking anyone.
- Full refund, part refund, or no refund, each with a reason.

**US-J4.** As a buyer I want to return goods that do not spoil within 7 days, paying the return delivery myself.

**US-J5.** As Operations I want banned people kept out.
- A new account reusing a banned payout account, identity or device is held for review.

#### Epic K. Notifications and settings [P1]

**US-K1.** As a user I want to choose how I hear about each kind of event.
- Security and money events always reach me on at least one channel. Alerts open the exact conversation or order.

**US-K2.** As a user I want to download or delete my data.
- Deletion is refused, with the reason, while I have open orders or a debt. Only records the law requires are kept.

#### Epic L. Founder and staff [P0 onwards]

**US-L1.** As the founder I want one screen with the numbers that matter, including losses against the alarm level I approved.
**US-L2.** As the founder I want a progress update every day (section 18).
**US-L3.** As a super admin I want every staff action logged where nobody can alter it.

---

## 17. Phases, team, cost, competitors and risks

### 17.1 Phases

Durations assume the team in 17.3, and are estimates to be re-planned by the engineering lead once the work is sized. They run from the day the "This week" decisions in section 19 are made.

| Phase | What ships | What the founder can do at the end | Needs first |
|---|---|---|---|
| **P0. Waitlist** (about 2 weeks) | Waitlist, referral places, confirmation messages, staff export and invite, founder view, corrected website wording. | Share one link and watch sign-ups by city grow every day. | D1, D3c, D9, D10 started, **[U9]**. Approval of Earth's WhatsApp sender name takes days to weeks, so the waitlist may open with SMS and email codes first. |
| **P1. Stores, one city** (about 5 months) | Accounts, seller set-up, Identity and Business verification, products, search, one-store cart and checkout with live delivery quotes from one aggregator, split payments in naira, orders with live tracking, conversations with product cards and price offers, refunds, disputes, returns, notifications, admin console, installable web application. Groups A and A2. | Order food from a verified farm near the city, choose the car, watch it arrive, and see Earth's commission and delivery margin on the founder view. | D2a, D2b, D3a, D3b, D4, D5, D8, D11, D12, D14, D15. Payment company and aggregator accounts, which need the company's documents **[D9]** and take weeks. Seller terms. **[U1] [U3] [U4] [U5] [U7] [U12] [U13] [U15] [U16] [U17] [U18]**. Design runs about 6 weeks ahead of the build. |
| **P2. Verified profiles and requests** (about 6 weeks, starts as P1 stabilises) | Licence verification, verified seller profiles for exporters and mineral sellers including gold, buyer identity verification, screened buyer requests, the document store. | Show a verified gold mine owner's profile, and watch a verified buyer's request reach him. | **[U6] [U11]** |
| **P3. Bulk lane** (about 3 months, **only after the legal opinion**) | Bulk listings, enquiries, requests for quotation, bulk offers, agreement records, document requests, inspection ordering, freight quotes, buying organisations, subscriptions. Groups B and C. | Watch an exporter and a foreign buyer negotiate, exchange documents and close, inside Earth. | D6, D13, the opinion in 11.4, inspection and freight partners |
| **P4. More cities, abroad, and gold listings** | A second city and the second aggregator, delivery between cities for goods that do not spoil, sellers abroad and dollar store payments, Site inspected, Group D then E listings, licensed escrow as a checkout option **[U10]**, logistics partner portal. | A seller abroad is paid in dollars. A verified, inspected gold seller lists to verified buyers. | D7, P3 running cleanly |

Counting from the start: the waitlist is live in about 2 weeks, the first real order in about month 5 or 6, the gold mine owner's verified profile in about month 7, and the Bulk lane around the end of the first year. **These are honest estimates for a small team, not promises.** The way to make them shorter is fewer features in P1 or more engineers, and section 17.4 lists what could be cut.

**Order of work inside P1:** accounts and seller set-up; products and public pages; conversations; checkout with payments and delivery; orders and tracking; refunds, disputes and the admin console. Verification and its queue run alongside from week 3, because nothing goes live without them.

### 17.2 What a person outside Nigeria can do, by phase

The founder said this is very important, so here it is without gloss.

| Phase | A person in the United States can |
|---|---|
| P0 | Join the waitlist. |
| P1 | Browse, and pay by international card for delivery to an address in the delivery zone, for example food for family, from sellers past their first limit (9.4). Nothing can be shipped abroad yet. |
| P2 | As a verified buyer, find verified exporters and mineral sellers and send requests. **This is where Earth first becomes useful from abroad.** |
| P3 | Negotiate, exchange documents and arrange freight inside Earth. |
| P4 | Sell on Earth and be paid in dollars, once Earth has a foreign company **[D7]**. |

### 17.3 Team and cost

We do not know the budget, and it is not ours to set. This is what the plan needs, so the founder and the engineering lead can price it.

| Role | P0 | P1 | Note |
|---|---|---|---|
| Frontend engineer | 1 | 2 | One on the public pages and design system, one on the application |
| Backend engineer | 1 | 2 | Payments and logistics integrations are a full person's work |
| Designer | part time | 1 | About 50 inventory rows, each with its states |
| Product and quality | part time | 1 | Owns this document, testing and the daily update |
| **Operations** | — | 1 from a month before opening | Verification, listing review, support, disputes and reversals, as one person's hats at launch. A second person at about 50 orders a day. |
| Lawyer, accountant | engaged | engaged | **[D10] [U15]** |

With one frontend and one backend engineer instead of two each, P1 is closer to 8 months.

**What drives running cost:** salaries above; translation into each added language; hosting (modest at launch); the identity company's fee for each seller checked; WhatsApp and SMS messages, several per order; the payment company's fee on the delivery part of each order; the logistics wallet float **[D12]**; the refund reserve; and losses, watched by the alarm in **[D11]**.

**The founder was right about staffing.** Refusing escrow avoids a licensed, regulated money operation. It does not reduce staff to zero: verification, support and reversals need a person. The plan keeps that to one person at launch by automating Tier 1, screening products by machine, and keeping the Bulk lane's manual work (requests, freight quotes) out of phase 1.

**When Earth earns:** from the first order in P1, about 860 naira per typical order at the recommended rates (9.3). Monthly break-even is running cost divided by that figure.

### 17.4 What could be cut from P1 to go faster

In order of least harm: returns for change of mind (keep faulty-goods disputes) · ratings · price offers in chat (keep messages and product cards) · voice notes · the third language (keep English and Pidgin) · Business verification (launch with Identity only, and limits by track record) · collect-it-myself.

What cannot be cut: verification, the payout rules, payment confirmation and refunds, delivery choice and tracking, disputes, the reversal desk, the admin console. Those are what stop Earth losing money.

### 17.5 Who else is doing this

| Company | What they do | What it means for Earth |
|---|---|---|
| **PricePally** (Lagos) | Online fresh-food shopping with delivery windows, and group buying that splits a bulk lot among several buyers. | The closest competitor to P1, and already liked. They buy and deliver themselves. Earth's difference: any farm or seller can open a store, and the buyer chooses the delivery company. Their group-buy idea is worth copying later. |
| **Jumia, Konga** | General marketplaces with their own logistics. | Weak in fresh food. Strong brands and delivery reach. They could add farm stores if Earth proves the demand. |
| **Jiji** | Classified adverts. No payment, no delivery. | Where farmers and livestock sellers already post for free. Earth must be clearly safer and easier to be worth its commission. |
| **Vendease** | Food supply to restaurants, holding stock. Cut 44% of staff in 2025. | Proves restaurant demand, and proves that holding stock is expensive. Supports the platform-only rule. |
| **Twiga Foods** (Kenya) | Farm-to-retailer distribution with its own fleet. Raised about $185M and was reported in administration in 2026 (TechCabal, 14 September 2026). | The clearest warning against owning logistics. |
| **AFEX and the other licensed commodity exchanges** | Warehouse receipts and graded commodity trading, registered with the securities regulator. | The legal owners of the word "exchange". A possible partner for the Bulk lane, and a possible complainant if Earth looks like one (11.4). |
| **Sabi** | Trade platform that cut staff in 2025 and refocused on proof of origin for minerals and crops. | Shows what foreign buyers actually pay for: traceability and documents. Validates phases 2 and 3. |
| **Alibaba, Tridge** | Global bulk sourcing. | Set buyer expectations for requests for quotation and verified suppliers. Weak on Nigerian supply and local verification. |

### 17.6 What could kill this, and what we do about it

| Risk | What we do |
|---|---|
| **Food arrives late or spoiled**, and the first buyers never return | One city, same-day only for fresh goods, an honest "not refrigerated" notice, partial refunds that are quick and fair, and delivery failure rates watched per provider. |
| **Reversed payments and refund losses** exceed earnings | Section 9.4, the alarm in **[D11]**, and **[D4]** if the payment company allows it. |
| **No sellers, so no buyers; no buyers, so no sellers** | The waitlist by city tells us where supply is. Open in the city with the most sellers. Recruit the first 50 stores by hand before opening to buyers. |
| **Buyers and sellers move to WhatsApp after the first order** | Make ordering on Earth easier than arranging it by hand: delivery choice, tracking, buy again, and a track record the seller values. Accept that some will leak (10.7). |
| **A regulator objects** (securities, central bank, data protection) | Lawyer in week 1 **[D10]**. No "exchange" in public. Bulk lane built only after the opinion. |
| **The plan is too big for the team** | Section 17.4, and a rule: nothing is added to P1 without something of equal size coming out. |
| **A logistics or payment company changes its terms or fails** | Both sit behind internal interfaces. A second provider of each is identified before launch and integrated before the second city. |

---

## 18. Daily progress update

The founder asked for daily updates so he can see progress. It has a fixed shape, so it takes five minutes to write and thirty seconds to read. Sent every day by 6 pm on WhatsApp by the product lead. On Sundays and days when nothing shipped it still goes, and says so.

```
EARTH · Day 14 · Fri 2 Oct

DONE TODAY
• Waitlist is live on the website (try it: <link>)
• Referral places now update every hour

SEE IT
<link to the live preview>   <screenshot or 20-second screen recording>

NEXT
• Invite-by-segment for staff

NEED FROM YOU
• Decision D14 (minimum order) by Wednesday. After that, checkout design waits.

NUMBERS
Waitlist 212 (+38 today) · sellers 41 · top city: Lagos
```

Every "done" item links to something the founder can open and try. Nothing is "done" unless it is on the preview link. Anything needed from him names the decision and the day it starts costing time. Saturdays add a short week summary and next week's plan. The latest update also appears on the founder view.

---

## 19. Decisions

Most can be answered with "yes", "no" or a number. Q1 asks which of two things you meant, and D9 asks you to send us your company details.

### This week

| # | Question | We recommend |
|---|---|---|
| **Q1** | When you said "when you pay, you confirm, we just get a percentage", did "you confirm" mean **(a)** the payment is confirmed, or **(b)** the buyer confirms the goods arrived? | Please tell us which. It decides how D4 is put to you. |
| **D1** | May we replace "exchange" with "marketplace" on the website, the deck and all public wording, and correct the lines listed in 11.3? | **Yes** |
| **D2a** | Earth's commission on store sales. | **7.5%**, reviewed after 90 days (options in 9.3) |
| **D2b** | Earth's margin on delivery, added to the carrier's price. | **10%**, minimum 100 naira, maximum 1,500 naira. May need to rise after the accountant's answer **[U15]**. |
| **D3a** | Is Lagos the launch city? | **Yes**, unless the waitlist shows more sellers elsewhere |
| **D3b** | Open with food and farm goods, bring in exporters and mine owners as verified profiles next (about month 7), and open public gold listings last (11.1, 11.2)? | **Yes** |
| **D3c** | Remove crude oil, gas and export timber from the website for good? | **Yes** |
| **D8** | Should the seller bear the payment company's fee on the goods (250 naira on a 10,000 naira order)? The earnings table in the brief assumes yes. | **Yes**, shown clearly on every order. Earth bears it on the delivery part, and on refunds that are not the seller's fault. |
| **D9** | **Please send:** the registered company name, a contact email and a phone number. | Needed for the website, the terms, and to open the payment and logistics accounts, which take weeks. |
| **D10** | May we engage a lawyer now for: seller terms; central bank licensing, including pay-after-the-window **[U7]**; the Bulk lane opinion **[U8]**; data protection registration **[U9]**; fresh produce **[U13]**; the refund policy? And an accountant for tax on delivery **[U15]**? | **Yes, in week 1.** We will bring you two fee quotes before anything is signed. |
| **D11** | Earth is the merchant on every payment, so it bears refunds and reversed payments that it cannot recover from sellers (9.4). **Do you accept this?** We will sound an alarm when losses in any 30 days pass **100,000 naira or 1% of payment volume**, whichever is higher, and never more than the refund reserve. | **Yes.** Be aware: **this is an alarm, not a ceiling.** Reversals arrive weeks late, so losses can pass it. When it sounds, seller limits tighten, international cards are switched off, and you are told the same day. Seller limits (9.5) bound what open orders can cost. Late reversals are not bounded by them. |

### Before checkout is built (about 6 weeks in)

| # | Question | We recommend |
|---|---|---|
| **D4** | If the payment company can hold each seller's share until the order's problem window closes (24 to 48 hours after delivery), and then pay it out on Earth's instruction, shall we use it? | **Yes.** It is the strongest protection we have found, and it lets seller limits be about three times higher. **Be aware:** the licensed payment company holds the money, never Earth, but releasing it on our instruction is close to what an escrow does. The lawyer must clear it **[U7]**, and the payment company must confirm it can do it **[U1]**. Sellers are then paid one to two days after delivery instead of the next working day. |
| **D5** | Limits on each seller's money at risk. | **100,000 naira** for a new seller, **500,000** after 10 good orders from at least 5 different buyers, **3,000,000** after 50 or once Business verified (9.5). The upper two can be about three times higher if D4 is in force. |
| **D12** | Working money to open with. | **500,000 naira**: 300,000 for the logistics wallet, 200,000 for the refund reserve. The reserve then grows from earnings. |
| **D14** | Minimum order per store. | **5,000 naira** |
| **D15** | Order value above which delivery insurance is included automatically. | **50,000 naira**, where the provider insures that category |

### Later

| # | Question | We recommend |
|---|---|---|
| **D6** | For bulk freight, may people enter partners' quotes by hand until those partners offer a computer connection? | **Yes**, clearly labelled. The alternative is no freight in the Bulk lane. |
| **D7** | Shall Earth register a company in the United States or United Kingdom, so sellers abroad can be paid in dollars? | **Not yet.** We will bring this back when phase 2 ships. |
| **D13** | For the Bulk lane, may Earth charge sellers a subscription and a one-time licence verification fee (9.6)? | **Yes to the model.** We will propose prices after speaking to 20 exporters and mine owners from the waitlist. No success fee until the lawyer has looked. |

---

## 20. Sources, and what remains unconfirmed

### 20.1 Sources opened during research, 19 September 2026

**Law**
- Investments and Securities Act 2025, sections 224, 238 and 357, read in the full text: `sec.gov.ng/documents/1319/Investments_and_Securities_Act_2025_x9rSXtI.pdf`
- Central bank payment licence categories: `aelex.com/categorisation-of-nigerian-payment-systems/`
- Consumer rights: `fccpc.gov.ng/consumers/consumer-rights-responsibilities/rights-responsibilities/`
- Prohibited export items: `fpis.gov.ng/ProhibitedExportItems.aspx`
- Export documents: `nepc.gov.ng/get-started/export-documents-procedures/` · `nafdac.gov.ng/our-services/categories-of-exports/`
- Mining titles: `miningcadastre.gov.ng` · licensing summary (law firm): `mondaq.com/nigeria/renewables/1696140/`
- Wood export ban, December 2025 (news report): `premiumtimesng.com/news/headlines/843954-nigeria-bans-wood-export-pledges-enforcement.html`
- Forged crude oil documents (news report of the national oil company's statement): `pulse.ng/articles/news/business-news/nnpc-corporation-says-98-of-documents-in-crude-sale-transactions-are-fake-2024080200130084709`
- Gold fraud pattern (United States Commerce Department guidance written for Ghana, used as the nearest comparison): `trade.gov/market-intelligence/ghana-avoiding-scams-international-trade-and-business`
- European conflict minerals rule: `policy.trade.ec.europa.eu/development-and-sustainability/conflict-minerals-regulation/regulation-explained_en`
- European deforestation rule dates: `trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation`
- Responsible gold: `lbma.org.uk/responsible-sourcing` · `fws.gov/law/lacey-act` · `ofac.treasury.gov/faqs/topic/1501` · United States food import notice: `fda.gov`

**Payments**
- Paystack splits: `support.paystack.com/en/articles/2132802` · fees: `…/2130306` · dollar settlement: `…/2130690` · reversals and the 16-hour window: `…/2125698`
- Refunds after settlement on split payments (third-party guide, not Paystack's own): `mctaba.com/learn/paystack/paystack-split-payments-and-marketplaces-complete-guide`
- Flutterwave splits: `developer.flutterwave.com/docs/split-payments` · pricing: `flutterwave.com/ng/pricing`
- Squad: `docs.squadco.com/Payments/aggregator-and-sub-merchants/`
- Stripe: `stripe.com/global` · `docs.stripe.com/connect/cross-border-payouts`

**Logistics**
- Shipbubble: `docs.shipbubble.com` · Terminal Africa: `docs.terminal.africa/tship`
- Fez: `fez-delivery-co.gitbook.io/fezcorporate-api-docs` · Chowdeck Relay: `chowdeck-api.readme.io` · GIG: `giglogistics.com/developer` · DHL: `developer.dhl.com`
- Flexport cannot quote by API: `developers.flexport.com/faq/general` · Haul247: `haul247.co/solutions/haulage` · cold chain: `kccl.com.ng`
- United States aggregators: `goshippo.com/pricing/api` · `easypost.com/pricing`

**Identity:** `blog.prembly.com/enhancing-business-expansion-through-digital-kyb-checks/` · `youverify.co/blog/youverify-global-know-your-business-kyb-solution` · `dojah.io/business-verification` · `docs.usesmileid.com`

**Comparable products**
- Alibaba: `seller.alibaba.com/rfq` · `tradeassurance.alibaba.com`
- Open Mineral: `openmineral.com` · `mining.com/former-glencore-traders-launch-concentrates-trading-platform/` · Tridge: `tridge.com` · Metalshub: `metals-hub.com` · Minexx: `minexx.co`
- Sabi: `techcabal.com/2025/06/19/sabi-cuts-staff-pivots-minerals/`
- Twiga (reported): `techcabal.com/2026/09/14/kenyan-startup-twiga-foods-enters-administration-after-years-of-financial-pressure/`
- Vendease: `techcabal.com/2025/02/19/vendease-second-layoffs/` · farm crowdfunding: `techcabal.com/2022/02/22/nigeria-agric-crowdfunding-crash/`
- PricePally: `pricepally.com` · `blog.pricepally.com/2023/04/14/3-ways-you-can-shop-on-pricepally/`
- Mentions: `slack.com/help/articles/205240127` · WhatsApp catalogues and offline queue: `faq.whatsapp.com`
- Progressive onboarding: `docs.stripe.com/connect/custom/onboarding`
- RTK Query streaming updates: `redux-toolkit.js.org/rtk-query/usage/streaming-updates`
- Installable web applications: `web.dev/case-studies/konga` · `web.dev/case-studies/jumia` · USSD decline: `ncc.gov.ng`

### 20.2 Not confirmed. Nothing may be built on these until someone has checked.

| # | Open question | Who confirms | Blocks |
|---|---|---|---|
| **U1** | Can Paystack or Flutterwave hold a seller's share of a split payment until Earth says the order's problem window has closed? (Paystack sub-accounts appear to have a manual settlement setting.) | Backend lead, in the test system and in writing | D4, and the size of every limit in 9.5 |
| **U2** | Do split payments work on dollar charges? | Backend lead | Dollar products, P4 |
| **U3** | When a split payment is refunded or reversed after the seller was paid, is it taken from Earth's balance? Confirmed only by a third-party guide. | Backend lead, in writing from the payment company | **Start of P1 build** |
| **U4** | Do the aggregators' terms allow reselling delivery at a higher price? | Product lead, in writing | Delivery margin |
| **U5** | What weight will parcel couriers carry, and do they accept and insure fresh produce and live animals? | Product lead, in writing | What stores can sell for delivery |
| **U6** | Can a mining title be checked on the public cadastre portal without an account? | Operations, by trying it | Speed of mineral verification, P2 |
| **U7** | Does using only a licensed payment company's split settlement keep Earth outside central bank licensing? Does that still hold if the company holds a seller's share and releases it on Earth's instruction (D4)? | Lawyer | **Launch of P1**, and D4 |
| **U8** | Does recording an accepted bulk offer count as executing a commodity contract? Does a success fee make Earth a commodity broker? | Capital markets lawyer | **All of P3** |
| **U9** | Data protection registration category, and whether an officer must be appointed. | Lawyer | Launch of P0 |
| **U10** | Licence status of the third-party escrow companies found (Vesicash, AtaraPay, PayScrow). | Product lead | Escrow option, P4 |
| **U11** | Which identity companies can verify people and businesses in the United States and Europe? | Backend lead | Buyer verification, P2 |
| **U12** | Is charcoal covered by the wood export ban? Is the international rosewood trade suspension still in force? | Operations | Forestry rules |
| **U13** | Does the domestic sale of raw fresh produce need any federal licence? None found. | Lawyer | Launch of P1 |
| **U14** | Can one payment be divided among several sellers in fixed amounts, and how many? | Backend lead, in the test system | Paying once for several stores (after P1) |
| **U15** | Is tax due on the whole delivery charge, or only on Earth's margin? Is commission quoted with or without tax? | Accountant | Delivery margin in D2b |
| **U16** | How fast do the aggregators actually return quotes? | Backend lead, by measuring | The 10-second cut-off in 8.3 |
| **U17** | Can each aggregator enforce a delivery code on its riders, or return a proof-of-delivery photo to Earth? | Backend lead, in the test system | Delivery evidence in 8.4 and 9.4 |
| **U18** | Will the payment company let Earth keep a standing balance to fund refunds, rather than sweeping it to the bank daily? | Backend lead, in writing | The refund reserve in 9.4 |
