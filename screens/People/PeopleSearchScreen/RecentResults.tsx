import React from "react"
import { View } from "react-native"
import Button from "../../../components/Button"
import SearchResult from "../../../components/SearchResult"
import { CentredText, SubtitleText } from "../../../components/Typography"
import type { Person } from "../../../types/uclapi"

interface RecentResultProp {
  recent: Person,
  viewPerson: () => void,
}

const RecentResult: React.FC<RecentResultProp> = ({ recent, viewPerson }) => (recent ? (
  <SearchResult
    key={recent.email}
    topText={recent.name}
    bottomText={recent.department}
    type="person"
    onPress={viewPerson}
  />
) : null)

interface RecentResultsProps {
  viewPerson: (e: string) => () => void,
  recents: Person[],
  clearRecentResults: () => void,
}

const RecentResults: React.FC<RecentResultsProps> = ({
  recents = [],
  clearRecentResults,
  viewPerson,
}) => {
  if (recents.length === 0) {
    return null
  }
  return (
    <View>
      <SubtitleText>Recently Searched</SubtitleText>
      {recents.map((recent) => (
        <RecentResult
          key={`${recent.email}-${recent.name}`}
          recent={recent}
          viewPerson={viewPerson(recent.email)}
        />
      ))}
      {recents.length > 0 ? (
        <Button onPress={clearRecentResults}>Clear</Button>
      ) : (
        <CentredText>Recent results will appear here.</CentredText>
      )}
    </View>
  )
}

export default RecentResults
