import { read } from '$app/server';
import Sheet from '$lib/content/Living bibliography demo content-v0.5.xlsx';
import { process_XLSX } from '$lib/xlsx/process';
import { read_XLSX_server } from '$lib/xlsx/read_server';
import { error } from '@sveltejs/kit';

/** @type {import('$lib/types').Living_Bibliography} */
const temp_data = {
	info: {
		Title: 'Is your manuscript even illuminated?',
		Subtitle: 'Resuscitating the annotated bibliography',
		Authorship: 'Max'
	},
	entries: [
		{
			Title: '‘Jeuje,’ ‘Zhoosh,’ ‘Zhuzh’: A Word of Many Spellings, and Meanings',
			Publisher: 'New York Times',
			Date: 'Jan. 31, 2022',
			Annotation:
				"My spelling is the best. Why? Because it it's the one that feels most like the sound of aerating a green juice with a stick blender.",
			Tags: ['Trivia'],
			Link: 'https://www.nytimes.com/2022/01/31/style/jeuje-zhoosh-zhuzh.html',
			'Date added to bibliography': '2024-08-20T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'Kinds of bibliographies',
			Publisher: 'The Chicago Manual of Style',
			Date: '2024',
			Annotation:
				'Of the bibliographic essay form they say, "Less formal than an annotated bibliography is a bibliographic essay, in which the author treats the literature discursively. Because works treated in this way are not alphabetized, subject divisions may be made freely (see 13.67). Such an essay may be particularly suited to certain types of archival sources that do not easily lend themselves to an alphabetical list."',
			Tags: ['Organisations I respect'],
			Link: 'https://www-chicagomanualofstyle-org.ap1.proxy.openathens.net/book/ed18/part3/ch13/psec068.html',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: 41.7860067378412,
			Longitude: -87.5899260360141,
			'Academic source': 'Yes',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'Horizon',
			Publisher: 'Unsplash',
			Date: '2024',
			Annotation: 'Results for "Horizon" on mostly free stock photography website Unsplash.',
			Tags: ['Nice to look at'],
			Link: 'https://unsplash.com/s/photos/horizon',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'High'
		},
		{
			Title: 'In die natalis domini responsorial',
			Publisher: 'University of Sydney',
			Date: '1535-1540?',
			Annotation:
				'The university collection of illuminated Spanish liturgical manuscripts is on another level. "This responsorial contains a remarkable depiction of an American turkey, one of the earliest extant illustrations of American fauna to appear in Europe and certainly the earliest illustration of a turkey."',
			Tags: ['Nice to look at', 'The University of Sydney'],
			Link: 'https://digital.library.sydney.edu.au/nodes/view/6933',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'Yes',
			'A second user-defined field': 'Low'
		},
		{
			Title: "Chief Scientist's keynote at UA Solutions Summit",
			Publisher: 'Dr Cathy Foley, Australia’s Chief Scientist',
			Date: '28/02/2024',
			Annotation:
				'Talking about politicians, the Chief Scientist said "they don’t have subscriptions to academic publications, and effectively work without access to our literature." "It’s not democratised if the only people who can access [research] are part of an academic library. The number of times I’ve spoken about this to politicians and ministers … they’re making decisions on a Sunday night, getting ready for a cabinet meeting the next day … they want to get to the core of the information to be able to understand it."',
			Tags: [],
			Link: 'https://www.youtube.com/watch?v=ItTZRcwemnA',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -35.3178849159591,
			Longitude: 149.097176511913,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'ArXiv',
			Publisher: 'ArXiv',
			Date: '2024',
			Annotation: 'When will the policy academics finally indulge in a little preprint culture?',
			Tags: ['Organisations I respect'],
			Link: 'https://arxiv.org/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'Yes',
			'A second user-defined field': 'High'
		},
		{
			Title: 'Analysis of NICS gun purchase background checks',
			Publisher: 'New York Times',
			Date: '2016',
			Annotation:
				"Code and data for the New York Times analysis of gun sales. If they could do this eight years ago, you've got to wonder when our hemisphere might make even a half-hearted attempt to catch up.",
			Tags: [],
			Link: 'https://github.com/nytimes/gunsales',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'The Sydney Policy Lab Strategy 2024–27',
			Publisher: 'Sydney Policy Lab',
			Date: '2023',
			Annotation: '"Transforming communities and kick-starting public policy R&D"',
			Tags: ['The University of Sydney'],
			Link: 'https://www.sydney.edu.au/sydney-policy-lab/news-and-analysis/latest-news/2023/11/24/transforming-communities-and-kick-starting-public-policy-research.html',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -33.8852651329212,
			Longitude: 151.185810232539,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'Living Annotated Bibliographies',
			Publisher: 'Sydney Policy Lab',
			Date: '2024',
			Annotation:
				'A tool for glitzy presentation of spreadsheets containing annotated bibliographic data.',
			Tags: ['Metatextual jokes', 'Nice to look at', 'The University of Sydney'],
			Link: '/#',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'High'
		},
		{
			Title: 'Our Sydney',
			Publisher: 'FASS1000 and Techlab',
			Date: '2020-21',
			Annotation: 'Fun!',
			Tags: ['The University of Sydney'],
			Link: 'https://oursydney.techlab.works/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'StoryMap',
			Publisher: 'Knight Lab',
			Date: '25/09/2013',
			Annotation:
				'"StoryMapJS is a free tool to help you tell stories on the web that highlight the locations of a series of events. It is a new tool, yet stable in our development environment, and it has a friendly authoring tool."',
			Tags: [],
			Link: 'https://storymap.knightlab.com/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'The FASS1000 Sham',
			Publisher: 'Honi Soit',
			Date: '17/10/2023',
			Annotation:
				'Some students think "FASS1000 is a microcosm of an increasingly corporate university that values generality and neglects specialisation."',
			Tags: [],
			Link: 'https://honisoit.com/2023/10/the-fass1000-sham/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'High'
		},
		{
			Title: 'FASS1000: Studying Arts and Social Sciences',
			Publisher: 'University of Sydney',
			Date: 'Semester 2 2024',
			Annotation:
				'The course overview says: "What does it mean to study Arts and Social Sciences? In this unit, we begin with a central claim: that the disciplines that make up Arts and Social Sciences are fundamental to understanding our world and the challenges it faces. Through a set of engaging topics, we ask the foundational questions underpinning our areas of study: what does it mean to be part of a university community? How do we think, read, create, speak, and act, critically? How do we engage in and solve complex, often multifaceted problems, individually and in collaboration with others? How will you build the key communication and interpersonal skills to make a difference in a complex and challenging world?"',
			Tags: ['The University of Sydney'],
			Link: 'https://www.sydney.edu.au/units/FASS1000/2024-S2C-ND-CC',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -33.8881345714752,
			Longitude: 151.190481234155,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'archives.design',
			Publisher: 'Valery Marier',
			Date: '2024',
			Annotation:
				'An example of the outstripping. "A digital archive of graphic design related items that are available on the Internet Archives." Have a browse.',
			Tags: ['Nice to look at'],
			Link: 'https://archives.design/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'Recommended formats statement',
			Publisher: 'Library of Congress',
			Date: '2024-25',
			Annotation:
				'"Recommended Formats Statement identifies hierarchies of the physical and technical characteristics of creative formats, both analog and digital, which will best meet the needs of all concerned, maximizing the chances for survival and continued accessibility of creative content well into the future."',
			Tags: ['Organisations I respect', 'Trivia'],
			Link: 'https://www.loc.gov/preservation/resources/rfs/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'High'
		},
		{
			Title: 'Caring for video',
			Publisher: 'National Film and Sound Archive of Australia',
			Date: '2024',
			Annotation:
				'"Will tapes last longer if they are not used? Not necessarily. Tapes that are rewound or played at least annually to rewind pack stresses may last longer than tapes which are not played at all. However, the more often you play a tape, the greater the likelihood that the tape will be damaged. Copies should be made of frequently used tapes so that a backup exists."',
			Tags: ['Organisations I respect', 'Trivia'],
			Link: 'https://www.nfsa.gov.au/preservation/guide/home/caring-video',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -35.2830676490786,
			Longitude: 149.12170957189,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: "Millions to protect some of Australia's most fragile and flammable film treasures",
			Publisher: 'ABC News',
			Date: '01/06/2024',
			Annotation: null,
			Tags: [],
			Link: 'https://www.abc.net.au/news/2024-06-01/budget-boost-protecting-fragile-australian-films/103893520',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -33.8825012330536,
			Longitude: 151.201658047076,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'Link rot',
			Publisher: 'Ahrefs blog',
			Date: '02/02/2024',
			Annotation:
				'"At Least 66.5% of Links to Sites in the Last 9 Years Are Dead (Ahrefs Study on Link Rot)"',
			Tags: [],
			Link: 'https://ahrefs.com/blog/link-rot-study/',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'High'
		},
		{
			Title: 'RD Watt Building',
			Publisher: 'Google Maps',
			Date: '2024',
			Annotation: 'Home sweet home.',
			Tags: ['The University of Sydney'],
			Link: 'https://maps.app.goo.gl/4CJMBQW6d3ofwF7d9',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: -33.8852651329212,
			Longitude: 151.185810232539,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'Zetellkasten',
			Publisher: 'Wikipedia',
			Date: '2024',
			Annotation:
				"There's a great b-plot in Bring Up The Bodies where Cromwell seeks out the plans for a cabinet with infinitely nested drawers that can hold all knowledge. Instead, he ends up with Christophe, the best fictional character in the series. Anyway, \"A Zettelkasten (German: 'slipbox', plural Zettelkästen) or card file consists of small items of information stored on Zettels (German: 'slips'), paper slips or cards, that may be linked to each other through subject headings or other metadata such as numbers and tags. It has often been used as a system of note-taking and personal knowledge management for research, study, and writing.\"",
			Tags: ['Sources found on Wikipedia', 'Trivia'],
			Link: 'https://en.wikipedia.org/wiki/Zettelkasten',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Medium'
		},
		{
			Title: 'Ghostly Demarcations: A Symposium On Jacques Derrida\'s "Specters of Marx"',
			Publisher: 'Terry Eagleton',
			Date: '2008',
			Annotation:
				'"The portentousness is ingrained in the very letter of this book, as one theatrically inflected rhetorical question tumbles hard on the heels of another in a tiresomely mannered syntax which lays itself wide open to parody."',
			Tags: ['Sources found on Wikipedia', 'Metatextual jokes'],
			Link: 'https://books.google.com/books?id=g7zGmaggvesC',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'Yes',
			'A second user-defined field': 'High'
		},
		{
			Title: 'Obsidian graph view plugin',
			Publisher: 'Obsidian Help',
			Date: '2024',
			Annotation: null,
			Tags: ['Trivia'],
			Link: 'https://help.obsidian.md/Plugins/Graph+view',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'No',
			'A second user-defined field': 'Low'
		},
		{
			Title: 'Why Index?',
			Publisher: 'The Chicago Manual of Style',
			Date: '2024',
			Annotation:
				'"This painstaking intellectual labor serves readers of any longer work, whether it is searchable or not. For searchable texts, an index provides insurance against fruitless queries and unintended results."',
			Tags: ['Organisations I respect'],
			Link: 'https://www-chicagomanualofstyle-org.ap1.proxy.openathens.net/book/ed18/part3/ch15/psec002.html',
			'Date added to bibliography': '2024-08-30T00:00:00.000Z',
			Latitude: null,
			Longitude: null,
			'Academic source': 'Yes',
			'A second user-defined field': 'Medium'
		}
	],
	narrative: [
		{
			Heading: null,
			'Markdown content':
				'<p>We’re introducing a new tool to explore and share annotated bibliographies. This is an example and test.</p>\n<p>What the tool does, in short, is take a table of sources and a title from an Excel spreadsheet and generate a page like this one. To enliven the bibliography, you can add free text sections like these paragraphs to highlight selections from the source list.</p>\n<p>So, it’s a zhuzhed up spreadsheet? A Lab marketing project designed to squeeze Digital Content from the humble academic task of a preliminary literature review?</p>\n<p>Yes! And maybe also something our colleagues could use, an avatar of our thinking about doing policy research in public, and – long shot – a challenge to our peers to make better websites.</p>\n',
			'Related source titles': [
				'In die natalis domini responsorial',
				'‘Jeuje,’ ‘Zhoosh,’ ‘Zhuzh’: A Word of Many Spellings, and Meanings'
			]
		},
		{
			Heading: 'What would the dorks say this is?',
			'Markdown content':
				'<p>The good people of the Chicago Manual of Style, who have just released their 18th edition with an unsettling, lime-tinged yellow cover would consider this an “annotated bibliography” with “bibliographic essay” potential. This design accords with their view that a bibliographic essay “may be included in addition to a bibliography, in which case it should come first.”</p>\n',
			'Related source titles': ['Kinds of bibliographies']
		},
		{
			Heading: 'Ulterior motives',
			'Markdown content':
				'<p>We’re doing this because too many literature reviews and bits of early research for projects – “horizon scanning” as my colleague puts it – are sequestered in documents that are too much trouble to publish.</p>\n<p>One suspects that if we had a dollar for every policy-producing organisation who has made their own list of “existing projects on the cost of living crisis” in the last two years, we might have enough cash to solve it.</p>\n<p>Likewise, University academics produce a host of material that’s not suited to peer-reviewed publication but would be useful if it were public. They want for a presentation format that conveys legitimacy without wasting time and end up not publishing anything, much less negative results that would help steer colleagues away from dead ends that have already been explored. (I say that with deep affection for the Blogspot sites hosting decides of rants by professor emeriti.)</p>\n<p>There’s no reason we shouldn’t, as a matter of practice and collegial responsibility, share those lists, even when – particularly when, perhaps – nothing comes of the exploration.</p>\n<p>That’s the main motivation, but the tool tries to get users implicitly on board with a few other ideas:</p>\n<ul>\n<li>Our reference lists are not static. These bibliographies can be easily updated and should be to reflect how thinking changes throughout a project. Conversely, it shouldn’t be a barrier to publication that a list is preliminary and doesn’t reflect the views of the author or the full field.</li>\n<li>It’s good to place academic and non-academic references alongside each other. This helps organisations like ours honestly show readers the equal influence academic material and other sources have on our work, while persuading bores in our audiences the latter has value.</li>\n<li>A bibliography is never complete; authors should solicit contributions and discussion by default.</li>\n<li>No one should be able to include “desktop research” as five figure line item in a consultancy fee proposal and expect they’ll get away with producing a document of less than publishable quality.</li>\n</ul>\n',
			'Related source titles': ['Horizon']
		},
		{
			Heading: 'Working in the open',
			'Markdown content':
				"<p>What is missing is a further element of our motivation that involves walking the talk of working in the open.</p>\n<p>There’s general agreement that it’s a good thing to do, but while peer-reviewed articles appear with data statements and formal bibliography, and the best journalists share the data from their reporting, policy labs and think tanks operate in a context where there’s less pressure to do so even when, notionally, we’re operating under fewer formal constraints.</p>\n<p>In the Lab strategy’s terms, anything that “share our methods, insights and collaborative successes with others” is a win.</p>\n<p>Separately, we whinge about decision makers and political partners inability to engage with peer-reviewed literature. Even when they want to, there often isn’t the time or access at the chief scientist points out. The whinging is fair, but doesn’t get us out of needing a good answer for what kind of material we should be giving them.</p>\n<p>One view is the right way for a policymaker to receive academic or “evidence-based” work is to have it cut up into bite-sized pieces or stewed with sugar into one page baby food. I hope exploring new forms might help us interrogate whether that approach undermines the uptake of rigorous approaches to policymaking in the long run. For now, we remain eternally one factsheet away from eliminating inequality.</p>\n<p>Given we're serious about getting decision makers to do more rigorous work and take a wider range of influences seriously, annotated bibliographies entertain the prospect of presentation forms that synthesise and distil – giving an “executive summary” of “actionable insights,” perchance – without severing the formal connection to their academic roots.</p>\n",
			'Related source titles': [
				"Chief Scientist's keynote at UA Solutions Summit",
				'ArXiv',
				'Analysis of NICS gun purchase background checks',
				'The Sydney Policy Lab Strategy 2024–27'
			]
		},
		{
			Heading: 'How to make one',
			'Markdown content':
				'<p>Yeah, yeah, but how does it work?</p>\n<p>At this point, uploading an Excel file with the correct format inside is enough. It’s best to use the template provided, but the upload form on this page will give you some pointers if you decide to go it alone and muck things up.</p>\n<p>The template requires a few fields for each source but also accommodates as many extra as the user likes. You could add, for example, a “Levels of participation” or “Is it community led?” field by including a column with that title. Combined with the option for bibliography essay sections, that’s a fair amount of flexibility.</p>\n<p>We don’t want to be too strict or permit too much nonsense. The map is not the terrain: we can’t have the requirements of a zhuzhed up spreadsheet inform the content of users’ output beyond encouraging them to get on and share their work without cutting too many corners.</p>\n<p>We’re also trying to make the tool easy enough to use that, say, a first year course coordinator could require its use for a formative assessment without assuming tech support responsibilities or inculcating bad habits in students.</p>\n<p>I choose to use an uploaded spreadsheet rather than create an editor because I think it’s easier. Proprietary systems also give people the ick.</p>\n<p>It’s viable to say to a researcher “Hey can you chuck that list from Word into Excel?” To ask them to maintain a bibliography in a single-purpose website they otherwise never use is a recipe for disuse and discourages the kind of regularly updated ‘living’ bibliographies we want to see.</p>\n<p>(It’s likely to turn out that using a Google Sheets and dropping the link into the bibliography generator is even easier to create and publish, but haven’t had time to do that yet.)</p>\n',
			'Related source titles': ['Living Annotated Bibliographies']
		},
		{
			Heading: 'Our Sydney',
			'Markdown content':
				'<p>An interesting reference to think about just how easy a tool should be to use is the FAS1000 “Our Sydney” map website. The site is used for the FASS1000 week two tutorial — “What is a tutorial? Historicising Space and Place at the University of Sydney: ‘Our Sydney’ virtual map; Assessment 1 Workshop; academic integrity” — which has to be more interesting than producing another Canvas discussion contribution.</p>\n<p>It has great content up front and it’s cool that USyd users can create their own, but the map data can only be created and displayed on the site. That makes using it feel like a commitment to use and maintaining the software a responsibility.</p>\n<p>Our Sydney is also, in the way of most homespun academic tools, not maintained. For example, the “Canvas Citation Guide” link on the editor page goes to the Google homepage. The code – this is so me – include a section that is commented out and labelled: “// TODO: delete this if everything works.”</p>\n<p>Since the Our Sydney project is a layer around the open source StoryMap software from the brilliant Knight Lab at Northwestern, you have to wonder whether it’s receiving enough use to justify the cost of having it customised for the University and walled off from the outside world behind our unikeys.</p>\n',
			'Related source titles': [
				'Our Sydney',
				'StoryMap',
				'FASS1000: Studying Arts and Social Sciences',
				'The FASS1000 Sham'
			]
		},
		{
			Heading: 'Archival integrity',
			'Markdown content':
				'<p>The example motivates another reason to prefer building these from a spreadsheet: We owe it to the archivists.</p>\n<p>It’s not just that archivists are outstripping the rest of us in experimentation with novel presentation of existing material, they’re ahead while fighting a ceaseless rearguard action against researchers’ efforts to produce documents and websites that degrade as soon as they’re exposed to open air. (Granted some archivists are instead dedicating their careers to the preservation of the dwindling supply of VHS players necessary to make sense of the Bush era 🫡.)</p>\n<p>In the age of link rot most people don’t take their archival responsibility to society or even the sustainability of their projects seriously enough.\nWe should live in fear that our work will enter the graveyard of abandoned databases, indexes (both senses), reading lists, trackers, maps (both senses) and open data dictionaries.</p>\n<p>Non-government funders should ask harder questions before awarding grants: What will become of your data when your project has finished, been abandoned or fallen into disuse? Will the tool continue to function without maintenance? Who’s going to keep the project’s website online and do the security update when someone finds another ReDOS bug in the analytics library? Do you seriously expect a novel index measuring a social good produced one time in the course of a two-year project will have influence or continue to publish itself?</p>\n<p>So, we use a spreadsheet here because it will be useful long after this tool has disappeared from the internet. Authors get an easy, familiar editing environment and control of their data. We deal with our archival responsibilities by using simple tech and otherwise avoiding them.</p>\n',
			'Related source titles': [
				'archives.design',
				'Caring for video',
				"Millions to protect some of Australia's most fragile and flammable film treasures",
				'Link rot',
				'Recommended formats statement'
			]
		},
		{
			Heading: 'Are we there yet?',
			'Markdown content': '<p>Nearly.</p>\n',
			'Related source titles': []
		},
		{
			Heading: 'Maybe the map is the terrain',
			'Markdown content':
				"<p>There are a couple of other features. First, the map.</p>\n<p>I'm confident that the lust editors and content creators feel for scrollable interactives with embedded maps overwhelms everyone else’s interest in reading them. (If we weren’t privacy-inclined over here we could strap a CIA-worthy amount of tracking to these pages and prove it once and for all.)</p>\n<p>But it can be visually compelling, so any source with Latitude and Longitude values appears on the map above the complete bibliography. When sources with coordinates are referenced by narrative essay sections, they are displayed on an accompanying map around the text. </p>\n<p>A good motivation for including a map is that it’s already prompted us to discuss the socio-geographic diversity of our references. It might do the same for others.</p>\n",
			'Related source titles': ['RD Watt Building']
		},
		{
			Heading: 'Maybe the map is a graph',
			'Markdown content':
				'<p>In addition to having a map in the geographic sense, the bibliography has a graph in the mathematical nodes and edges sense, which is a map, in the conceptual sense, of the tagged relationships between the sources.</p>\n<p>I hope you had as much fun reading that sentence as I did writing it. Visit the source table to see the graph. Someone has to be Maitland’s Derrida.</p>\n<p>The graph is mostly unnecessary but a little adornment – illumination! – doesn’t go astray.</p>\n<p>There are two non-aesthetic reasons to keep it that don’t require valorising the nerds who spend more time developing Obsidian plugins to visualise their Zettelkasten than they do writing.</p>\n<p>It might help authors identify and remove useless tags that are only attached to a single source.</p>\n<p>And I sincerely hope it will make authors more intentional about the tags they select and fields they add. If, by running into this tool, just one undergraduate connects the work of coming up with tags that make sense with the kind of thinking an editor or librarian does day to day then, well, that’s impact. In Chicago’s terms, people need to recognise creating an index is “painstaking intellectual labour.”</p>\n<p>(At the end of the day, this whole mess is really about the intersection of my passion for good taxonomies with my permanent rage at content management systems that permit unfettered application of arbitrary tags to disparate fields crying out for a disciplined schema. That I’ve expressed the former by implementing the latter in this tool is exactly what’s wrong with me.)</p>\n',
			'Related source titles': [
				'Zetellkasten',
				'Ghostly Demarcations: A Symposium On Jacques Derrida\'s "Specters of Marx"',
				'Obsidian graph view plugin',
				'Why Index?'
			]
		},
		{
			Heading: 'What’s left',
			'Markdown content':
				'<p>There’s a bunch to do. I’m still working out the best way for non-technical users to publish these to the public internet.</p>\n<p>First, we should land on a name. “Living bibliography” is maybe overdoing it a bit but sounds nicer that “annotated bibliography visualiser” or “interactive annotated bibliography.”</p>\n<p>Some other questions:</p>\n<ul>\n<li>What should we call the other bits? Names for the essays section and so on are up for debate.</li>\n<li>Should it look so University of Sydney branded? Is it better to un-brand it so we can encourage use of the tool beyond the university.</li>\n<li>I’ve kept it simple by only permitting filtering by tag. We could add buttons to sort or filter by any field, but I’m tempted to keep it simple at risk of encouraging use of tags when new fields are more appropriate. </li>\n<li>Could we make this more academically formal without making it less accessible? I’m loosely for making the required fields of the sources match the required facts of publication for Chicago Manual of Style. (This would facilitate an “Export to Zotero” button or similar.)</li>\n<li>We should add some nice looking print styles so that hitting Cmd+P can spit out a usable PDF.</li>\n<li>Would it be going too far to come up with a way to link to sources from inline the bibliographic essay?</li>\n<li>Do we want to allow people to import of a Zotero collection or similar?</li>\n</ul>\n',
			'Related source titles': []
		}
	],
	author_defined_bibliography_keys: ['Academic source', 'A second user-defined field']
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const array_buffer = await read(Sheet).arrayBuffer();
	const workbook_data = await read_XLSX_server(Buffer.from(array_buffer));
	const read_result = await process_XLSX(workbook_data);

	console.log(read_result);

	// TODO: Hardcoded such that only 'demonstration' or 'campus-content' will work right now
	if (read_result.ok && read_result.data.info.Slug === params.slug) {
		return {
			bib_data: temp_data
		};
	}

	error(404);
}
